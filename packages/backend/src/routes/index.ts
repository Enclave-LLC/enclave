import { Express } from "express"
import spaceBookingRouter from "./space-booking"
import spaceRouter from "./space"
import customerBookingRouter from "./customer-booking"
import customerRouter from "./customer"

const registerRoutes = (app: Express) => {
  app.use("/customer", customerRouter)
  app.use("/customer/:customerId/booking", customerBookingRouter)
  app.use("/space", spaceRouter)
  app.use("/space/:spaceId/booking", spaceBookingRouter)
}

export default registerRoutes
