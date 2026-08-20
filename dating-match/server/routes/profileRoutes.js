import { Router } from "express";
import { saveProfile } from "../controllers/profileController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();
router.post("/", requireAuth, saveProfile);
export default router;
