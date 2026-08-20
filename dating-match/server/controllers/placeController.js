import { recommendPlaces, reorderCourse } from "../services/placeService.js";

export async function getPlaces(req, res, next) {
  const filters = {
    diet: req.query.diet || "all",
    season: req.query.season || "summer",
    nationality: req.query.nationality || "general",
    area: req.query.area || "all",
  };
  try {
    res.json(await recommendPlaces(filters));
  } catch (error) {
    next(error);
  }
}

export async function reorder(req, res, next) {
  try {
    res.json(await reorderCourse(req.body.ids || []));
  } catch (error) {
    next(error);
  }
}
