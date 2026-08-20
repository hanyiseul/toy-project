import { Router } from "express";
import { getPlaces, reorder } from "../controllers/placeController.js";

const router = Router();
router.get("/", getPlaces);
router.post("/reorder", reorder);
export default router;
