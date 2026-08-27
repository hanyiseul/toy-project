import { io } from "socket.io-client";
import { API_BASE_URL as SOCKET_URL } from "../config/api";
import { getToken } from "./authToken";

let socket = null;

export function getSocket() {
  if (typeof window === "undefined") return null;
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: false,
      auth: (callback) => callback({ token: getToken() }),
    });
  }
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
}
