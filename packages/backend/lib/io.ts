// Socket io server instance singleton
import * as http from "http"
import { Server, Socket } from "socket.io"
let io: Server | null = null
const userSocketMap: Record<string, Socket> = {} // Map to store user IDs and their corresponding sockets

export default {
  init: (httpServer: http.Server) => {
    io = new Server(httpServer, {})
    io.on("connection", (socket: Socket) => {
      console.log("A user connected")

      // Store the socket with a unique user ID
      socket.on("set-user-id", (userId: string) => {
        userSocketMap[userId] = socket
      })

      socket.on("disconnect", () => {
        console.log("A user disconnected")
      })
    })
    return io
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!")
    }
    return io
  },
  getUserSocket: (userId: string) => {
    return userSocketMap[userId]
  }
}
