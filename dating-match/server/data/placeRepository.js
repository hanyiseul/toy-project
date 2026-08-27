import { query } from "../config/database.js";
import { fallbackPlaces } from "./fallbackData.js";

const PARKING_RADIUS_METERS = 50;
const COURSE_TYPES = ["food", "cafe", "activity", "culture", "shopping"];
const MIN_COURSE_SIZE = 3;
const MAX_COURSE_SIZE = 5;

function pickRandomTypes() {
  const shuffled = [...COURSE_TYPES].sort(() => Math.random() - 0.5);
  const count =
    MIN_COURSE_SIZE +
    Math.floor(Math.random() * (MAX_COURSE_SIZE - MIN_COURSE_SIZE + 1));
  return shuffled.slice(0, count);
}

function filterFallbackPlaces({ area = "all", preference = "all" }) {
  return fallbackPlaces
    .filter((place) => area === "all" || place.area === area)
    .filter(
      (place) =>
        preference === "all" ||
        (preference === "indoor" ? place.indoor : !place.indoor),
    );
}

async function findOnePlace({
  placeType,
  cuisine,
  preference,
  area,
  transport,
  near,
  excludeIds,
}) {
  const conditions = ["is_active = TRUE", "place_type = ?"];
  const selectParams = [];
  const whereParams = [placeType];
  let distanceSelect = "";
  let havingClause = "";
  if (placeType === "food" && cuisine) {
    conditions.push("(cuisine = ? OR cuisine IS NULL)");
    whereParams.push(cuisine);
  }
  if (preference === "indoor") conditions.push("indoor = TRUE");
  if (preference === "outdoor") conditions.push("indoor = FALSE");
  if (area !== "all") {
    conditions.push("area = ?");
    whereParams.push(area);
  }
  if (transport === "drive") {
    conditions.push("has_parking = TRUE");
    if (near) {
      distanceSelect = `, (6371000 * ACOS(LEAST(1, GREATEST(-1,
        COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(?))
        + SIN(RADIANS(?)) * SIN(RADIANS(latitude))
      )))) AS distance_m`;
      selectParams.push(near.lat, near.lng, near.lat);
      havingClause = ` HAVING distance_m <= ${PARKING_RADIUS_METERS}`;
    }
  }
  if (excludeIds.length) {
    conditions.push(`id NOT IN (${excludeIds.map(() => "?").join(",")})`);
    whereParams.push(...excludeIds);
  }
  const orderBy = havingClause ? "distance_m ASC" : "RAND()";
  const rows = await query(
    `SELECT id, name, category AS type, place_type AS placeType, area, description, cost_min AS costMin, cost_max AS costMax, indoor, cuisine, has_parking AS hasParking, latitude, longitude${distanceSelect} FROM places WHERE ${conditions.join(" AND ")}${havingClause} ORDER BY ${orderBy} LIMIT 1`,
    [...selectParams, ...whereParams],
  );
  return rows[0] || null;
}

export async function findRecommendedPlaces(filters) {
  const {
    cuisine = null,
    preference = "all",
    area = "all",
    transport = "walk",
    near = null,
    types,
    excludeIds = [],
  } = filters;
  const resolvedTypes = types?.length ? types : pickRandomTypes();

  try {
    const picked = [];
    const pickedIds = [...excludeIds];
    const usedTypes = new Set();

    const attempt = async (placeType, overrides = {}) => {
      const place = await findOnePlace({
        placeType,
        cuisine,
        preference,
        area,
        transport,
        near,
        ...overrides,
        excludeIds: pickedIds,
      });
      if (place) {
        picked.push(place);
        pickedIds.push(place.id);
        usedTypes.add(placeType);
      }
    };

    for (const placeType of resolvedTypes) {
      await attempt(placeType);
    }

    // Guarantee at least MIN_COURSE_SIZE places: first backfill with unused
    // categories under the original filters, then progressively relax the
    // filters (parking/transport, indoor preference, cuisine, area) until the
    // minimum is met or every category has been tried.
    const unusedTypes = () => COURSE_TYPES.filter((type) => !usedTypes.has(type));
    const relaxSteps = [
      {},
      { transport: "walk", near: null },
      { transport: "walk", near: null, preference: "all" },
      { transport: "walk", near: null, preference: "all", cuisine: null },
      {
        transport: "walk",
        near: null,
        preference: "all",
        cuisine: null,
        area: "all",
      },
    ];
    for (const overrides of relaxSteps) {
      if (picked.length >= MIN_COURSE_SIZE) break;
      for (const placeType of unusedTypes()) {
        if (picked.length >= MIN_COURSE_SIZE) break;
        await attempt(placeType, overrides);
      }
    }

    return picked.map((place, index) => ({
      ...place,
      location: { x: 31 + index * 18, y: 26 + index * 20 },
    }));
  } catch (error) {
    console.warn("Using fallback places:", error.message);
    return filterFallbackPlaces(filters);
  }
}

export async function reorderPlaces(ids) {
  if (!ids.length) return [];
  const placeholders = ids.map(() => "?").join(",");
  try {
    const rows = await query(
      `SELECT id, name, category AS type, place_type AS placeType, area, description, cost_min AS costMin, cost_max AS costMax, indoor, cuisine, has_parking AS hasParking, latitude, longitude FROM places WHERE id IN (${placeholders})`,
      ids,
    );
    return ids
      .map((id) => rows.find((place) => place.id === Number(id)))
      .filter(Boolean);
  } catch (error) {
    console.warn("Using fallback course order:", error.message);
    return ids
      .map((id) => fallbackPlaces.find((place) => place.id === Number(id)))
      .filter(Boolean);
  }
}
