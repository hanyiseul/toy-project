import { Server } from "socket.io";
import { parseAuthCookie, verifyAuthToken } from "../middleware/authMiddleware.js";
import { assertConversationParticipant } from "../data/interactionRepository.js";
import { corsOrigins } from "../config/cors.js";

let io = null;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: corsOrigins(),
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token =
      socket.handshake.auth?.token ||
      parseAuthCookie(socket.handshake.headers.cookie);
    if (!token) return next(new Error("UNAUTHORIZED"));
    try {
      socket.data.userId = verifyAuthToken(token).sub;
      next();
    } catch {
      next(new Error("UNAUTHORIZED"));
    }
  });

  io.on("connection", (socket) => {
    socket.join(`user:${socket.data.userId}`);

    socket.on("conversation:join", async (conversationId) => {
      try {
        await assertConversationParticipant(conversationId, socket.data.userId);
        socket.join(`conversation:${conversationId}`);
      } catch {
        // not a participant of this conversation — ignore the join
      }
    });

    socket.on("conversation:leave", (conversationId) => {
      socket.leave(`conversation:${conversationId}`);
    });
  });

  return io;
}

export function emitToUser(userId, event, payload) {
  io?.to(`user:${userId}`).emit(event, payload);
}

export function emitToConversation(conversationId, event, payload) {
  io?.to(`conversation:${conversationId}`).emit(event, payload);
}
