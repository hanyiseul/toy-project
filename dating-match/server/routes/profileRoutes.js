import { Router } from "express";
import { saveProfile, uploadPhoto } from "../controllers/profileController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { uploadPhotoMiddleware } from "../middleware/uploadMiddleware.js";

const router = Router();
router.post("/", requireAuth, saveProfile);
router.post("/photo", requireAuth, uploadPhotoMiddleware, uploadPhoto);
export default router;
