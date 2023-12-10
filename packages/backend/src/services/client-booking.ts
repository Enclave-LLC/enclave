import logger from "../../lib/logger"
import db from "../db"
import { ApiResponse, HttpStatusCodes } from "../types"
import { ClientBookingPatchPayload } from "../types/client-booking"

const getBookings = async (clientId: string): Promise<ApiResponse<unknown>> => {
  try {
    const bookings = db.booking.findMany({
      where: {
        clientId: clientId
      },
      select: {
        spaceId: true,
        startDate: true,
        endDate: true
      }
    })
    return {
      code: HttpStatusCodes.OK,
      message: "success",
      data: bookings
    }
  } catch (err: unknown) {
    logger.log("error", "an error occured")
    return {
      code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      message: "error"
    }
  }
}

const patchBooking = async (
  clientId: string,
  bookingId: string,
  payload: ClientBookingPatchPayload
): Promise<ApiResponse<unknown>> => {
  try {
    await db.booking.update({
      where: {
        id: bookingId,
        clientId: clientId
      },
      data: {
        startDate: payload.startDate,
        endDate: payload.endDate
      }
    })
    return {
      code: HttpStatusCodes.OK,
      message: "success"
    }
  } catch (err: unknown) {
    logger.log("error", "an error occured")
    return {
      code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      message: "error"
    }
  }
}

const deleteBoooking = async (clientId: string, bookingId: string): Promise<ApiResponse<unknown>> => {
  try {
    await db.booking.delete({
      where: {
        id: bookingId,
        clientId: clientId
      }
    })
    return {
      code: HttpStatusCodes.OK,
      message: "success"
    }
  } catch (err: unknown) {
    logger.log("error", "an error occured")
    return {
      code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      message: "error"
    }
  }
}

export default {
  getBookings,
  patchBooking,
  deleteBoooking
}
