import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3001"; // Replace with your server URL
export const socket: Socket = io(SERVER_URL, {
  withCredentials: true,
  transports: ["websocket"],
});