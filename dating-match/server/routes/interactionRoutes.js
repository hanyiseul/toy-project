import { Router } from "express";
import {
  getConversationMessages,
  getConversations,
  getNotifications,
  postMessage,
  readNotification,
  updateRequest,
} from "../controllers/interactionController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();
router.get("/notifications", requireAuth, getNotifications);
router.patch("/notifications/:notificationId/read", requireAuth, readNotification);
router.patch("/requests/:requestId", requireAuth, updateRequest);
router.get("/conversations", requireAuth, getConversations);
router.get("/conversations/:conversationId/messages", requireAuth, getConversationMessages);
router.post("/conversations/:conversationId/messages", requireAuth, postMessage);
export default router;
