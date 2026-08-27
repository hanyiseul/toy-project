import { Router } from "express";
import {
  changePassword,
  findEmail,
  login,
  logout,
  me,
  resetPassword,
  signup,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);
router.post("/find-email", findEmail);
router.post("/reset-password", resetPassword);
router.patch("/password", requireAuth, changePassword);
export default router;
