import { query } from "../config/database.js";
import { fallbackMatches } from "./fallbackData.js";

function findFallbackMatches({
  page = 1,
  queryText = "",
  region = "all",
  nationality = "all",
  sort = "score",
}) {
  const filtered = fallbackMatches
    .filter((match) => `${match.name}${match.intro}`.includes(queryText))
    .filter((match) => region === "all" || match.region === region)
    .filter(
      (match) => nationality === "all" || match.nationality === nationality,
    )
    .sort((a, b) => (sort === "age" ? a.age - b.age : b.score - a.score));
  const pageSize = 10;
  const currentPage = Math.max(1, Number(page));
  const total = filtered.length;
  const start = (currentPage - 1) * pageSize;

  return {
    matches: filtered.slice(start, start + pageSize),
    pagination: {
      page: currentPage,
      limit: pageSize,
      total,
      pages: Math.max(1, Math.ceil(total / pageSize)),
    },
  };
}

export async function findMatches(filters) {
  const {
    page = 1,
    queryText = "",
    region = "all",
    nationality = "all",
    sort = "score",
    excludeUserId,
    targetType,
  } = filters;
  if (!targetType) {
    return {
      matches: [],
      pagination: { page: 1, limit: 10, total: 0, pages: 1 },
    };
  }
  const pageSize = 10;
  const currentPage = Math.max(1, Number.parseInt(page, 10) || 1);
  const offset = (currentPage - 1) * pageSize;
  const conditions = ["u.user_type = ?", "u.matching_enabled = TRUE"];
  const params = [targetType];
  if (excludeUserId) {
    conditions.push("u.id != ?");
    params.push(excludeUserId);
  }
  if (queryText) {
    conditions.push("(u.nickname LIKE ? OR u.bio LIKE ?)");
    params.push(`%${queryText}%`, `%${queryText}%`);
  }
  if (region !== "all") {
    conditions.push("u.preferred_area = ?");
    params.push(region);
  }
  if (nationality !== "all") {
    conditions.push("u.nationality = ?");
    params.push(nationality);
  }
  const where = conditions.join(" AND ");
  const order =
    sort === "age"
      ? "u.age ASC, u.created_at DESC"
      : "u.match_score DESC, u.created_at DESC";
  try {
    const countRows = await query(
      `SELECT COUNT(*) AS total FROM users u WHERE ${where}`,
      params,
    );
    const matches = await query(
      `SELECT u.id, u.nickname AS name, u.age, u.preferred_area AS region, u.nationality, u.match_score AS score, u.bio AS intro FROM users u WHERE ${where} ORDER BY ${order} LIMIT ${pageSize} OFFSET ${offset}`,
      params,
    );
    const total = Number(countRows[0].total);
    return {
      matches,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        pages: Math.max(1, Math.ceil(total / pageSize)),
      },
    };
  } catch (error) {
    console.warn("Using fallback matches:", error.message);
    return findFallbackMatches(filters);
  }
}

export async function createMatchRequest(requesterId, partnerId) {
  try {
    const result = await query(
      "INSERT INTO match_requests (requester_id, partner_id) VALUES (?, ?)",
      [requesterId, partnerId],
    );
    await query(
      "INSERT INTO notifications (user_id, type, match_request_id) VALUES (?, 'match_request', ?)",
      [partnerId, result.insertId],
    );
    return {
      requestId: result.insertId,
      userId: requesterId,
      partnerId,
      status: "requested",
    };
  } catch (error) {
    console.warn("Using fallback match request:", error.message);
    return {
      requestId: `fallback_match_${Date.now()}`,
      userId: requesterId,
      partnerId,
      status: "requested",
      persisted: false,
    };
  }
}
