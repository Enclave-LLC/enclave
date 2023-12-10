import { Request, Response } from "express"
import { ClientBookingService } from "../services"

const getBookings = async (req: Request, res: Response) => {
  const { clientId } = req.params
  const response = await ClientBookingService.getBookings(clientId)
  res.status(response.code).json(response)
}

const patchBooking = async (req: Request, res: Response) => {
  const { clientId, bookingId } = req.params
  const patchBookingPayload = req.body
  const response = await ClientBookingService.patchBooking(clientId, bookingId, patchBookingPayload)
  res.status(response.code).json(response)
}

const deleteBoooking = async (req: Request, res: Response) => {
  const { clientId, bookingId } = req.params
  const response = await ClientBookingService.deleteBoooking(clientId, bookingId)
  res.status(response.code).json(response)
}

export default {
  getBookings,
  patchBooking,
  deleteBoooking
}
