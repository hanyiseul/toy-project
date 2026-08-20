import {
  findRecommendedPlaces,
  reorderPlaces,
} from "../data/placeRepository.js";
import { geocodeLocation } from "./geocodeService.js";

export async function recommendPlaces(filters) {
  const near =
    filters.transport === "drive" && filters.area !== "all"
      ? await geocodeLocation(filters.area)
      : null;
  const places = await findRecommendedPlaces({ ...filters, near });
  return { places, applied: filters };
}

export function reorderCourse(ids) {
  return reorderPlaces(ids).then((places) => ({ places }));
}
