import { Request, Response } from "express"
import { SpaceBookingService } from "../services"

const createNewBooking = async (req: Request, res: Response) => {
  const bookingPayload = req.body
  const response = await SpaceBookingService.createNewBooking(bookingPayload)
  return res.status(response.code).json(response)
}

export default { createNewBooking }
