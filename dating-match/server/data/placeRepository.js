import { query } from "../config/database.js";
import { fallbackPlaces } from "./fallbackData.js";

function filterFallbackPlaces({
  diet = "all",
  season = "summer",
  area = "all",
  nationality = "general",
}) {
  let places = fallbackPlaces.filter(
    (place) => area === "all" || place.area === area,
  );

  if (diet === "halal") places = places.filter((place) => place.halal);
  if (diet === "vegetarian" || nationality === "india")
    places = places.filter((place) => place.vegetarian);
  if (season === "winter") {
    places = places.map((place) =>
      place.indoor
        ? place
        : {
            ...place,
            description: `${place.description} · 실내 대체 공간을 함께 안내해요`,
            costMax: place.costMax + 3000,
          },
    );
  }

  return places;
}

export async function findRecommendedPlaces(filters) {
  const {
    diet = "all",
    season = "summer",
    area = "all",
    nationality = "general",
  } = filters;
  const conditions = ["is_active = TRUE"];
  const params = [];
  if (diet === "halal") conditions.push("halal = TRUE");
  if (diet === "vegetarian" || nationality === "india")
    conditions.push("vegetarian = TRUE");
  if (area !== "all") {
    conditions.push("area = ?");
    params.push(area);
  }
  try {
    const rows = await query(
      `SELECT id, name, category AS type, area, description, cost_min AS costMin, cost_max AS costMax, indoor, halal, vegetarian, latitude, longitude FROM places WHERE ${conditions.join(" AND ")} ORDER BY id ASC`,
      params,
    );
    return rows.map((place, index) => ({
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
      `SELECT id, name, category AS type, area, description, cost_min AS costMin, cost_max AS costMax, indoor, halal, vegetarian, latitude, longitude FROM places WHERE id IN (${placeholders})`,
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
