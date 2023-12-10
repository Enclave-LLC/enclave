import { Express } from "express"
import spaceBookingRouter from "./space-booking"
import spaceRouter from "./space"
import clientBookingRouter from "./client-booking"
import clientRouter from "./client"

const registerRoutes = (app: Express) => {
  app.use("/client", clientRouter)
  app.use("/client/:clientId/booking", clientBookingRouter)
  app.use("/space", spaceRouter)
  app.use("/space/:spaceId/booking", spaceBookingRouter)
}

export default registerRoutes
