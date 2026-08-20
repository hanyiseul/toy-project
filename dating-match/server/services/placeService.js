import {
  findRecommendedPlaces,
  reorderPlaces,
} from "../data/placeRepository.js";

export function recommendPlaces(filters) {
  return findRecommendedPlaces(filters).then((places) => ({
    places,
    applied: filters,
  }));
}

export function reorderCourse(ids) {
  return reorderPlaces(ids).then((places) => ({ places }));
}
