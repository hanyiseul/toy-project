import { createMatchRequest, findMatches } from "../data/matchRepository.js";

export function listMatches(query, excludeUserId, targetType) {
  return findMatches({
    page: query.page || 1,
    limit: 10,
    queryText: query.query || "",
    region: query.region || "all",
    nationality: query.nationality || "all",
    sort: query.sort || "score",
    excludeUserId,
    targetType,
  });
}

export function requestMatch(userId, partnerId) {
  return createMatchRequest(userId, partnerId);
}
