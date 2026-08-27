import { createServer } from "node:http";
import express from "express";
import cors from "cors";
import { checkDatabase } from "./config/database.js";
import placeRoutes from "./routes/placeRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import interactionRoutes from "./routes/interactionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { initSocket } from "./realtime/socket.js";
import { uploadsDir } from "./middleware/uploadMiddleware.js";

const app = express();
const httpServer = createServer(app);
initSocket(httpServer);
const port = process.env.PORT || 4000;
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));
app.get("/", (_, res) =>
  res.json({
    service: "dating-match-api",
    message: "프론트엔드는 http://localhost:3000 에서 실행됩니다.",
    health: "/api/health",
  }),
);
app.get("/api/health", (_, res) =>
  res.json({ ok: true, service: "dating-match" }),
);
app.use("/api/places", placeRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/interaction", interactionRoutes);
app.use("/api/auth", authRoutes);
app.use((error, _, res, next) => {
  if (res.headersSent) return next(error);
  console.error(error);
  const message =
    error.message === "DATABASE_URL is not configured"
      ? "DATABASE_URL을 설정해야 실제 데이터를 사용할 수 있습니다."
      : "데이터 처리 중 오류가 발생했습니다.";
  res.status(503).json({ message });
});
app.use((_, res) =>
  res.status(404).json({ message: "요청한 API를 찾을 수 없습니다." }),
);
httpServer.listen(port, async () => {
  console.log(`dating-match API: http://localhost:${port}`);
  try {
    console.log("database:", await checkDatabase());
  } catch (error) {
    console.error("database connection failed:", error.message);
  }
});
