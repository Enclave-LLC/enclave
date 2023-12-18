import { Request, Response } from "express"
import { CustomerBookingService } from "../services"

const getBookings = async (req: Request, res: Response) => {
  const { customerId } = req.params
  const response = await CustomerBookingService.getBookings(customerId)
  res.status(response.code).json(response)
}

const patchBooking = async (req: Request, res: Response) => {
  const { customerId, bookingId } = req.params
  const patchBookingPayload = req.body
  const response = await CustomerBookingService.patchBooking(customerId, bookingId, patchBookingPayload)
  res.status(response.code).json(response)
}

const deleteBoooking = async (req: Request, res: Response) => {
  const { customerId, bookingId } = req.params
  const response = await CustomerBookingService.deleteBoooking(customerId, bookingId)
  res.status(response.code).json(response)
}

export default {
  getBookings,
  patchBooking,
  deleteBoooking
}
