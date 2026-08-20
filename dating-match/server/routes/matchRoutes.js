import { Router } from "express";
import { applyMatch, getMatches } from "../controllers/matchController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();
router.get("/", requireAuth, getMatches);
router.post("/requests", requireAuth, applyMatch);
export default router;
