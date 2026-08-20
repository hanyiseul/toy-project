import { Router } from "express";
import { saveFeedback } from "../controllers/feedbackController.js";

const router = Router();
router.post("/", saveFeedback);
export default router;
