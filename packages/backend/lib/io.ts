// Socket io server instance singleton
import * as http from "http"
import { Server } from "socket.io"
let io: Server | null = null

export default {
  init: (httpServer: http.Server) => {
    io = new Server(httpServer, {})
    return io
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!")
    }
    return io
  }
}
