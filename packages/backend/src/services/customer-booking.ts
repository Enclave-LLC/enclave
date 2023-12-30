import logger from "../../lib/logger"
import db from "../db"
import { ApiResponse, HttpStatusCodes } from "../types"
import { CustomerBookingPatchPayload } from "../types/customer-booking"

const getBookings = async (customerId: string): Promise<ApiResponse<unknown>> => {
  try {
    const bookings = db.booking.findMany({
      where: {
        customerId: customerId
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
  customerId: string,
  bookingId: string,
  payload: CustomerBookingPatchPayload
): Promise<ApiResponse<unknown>> => {
  try {
    await db.booking.update({
      where: {
        id: bookingId,
        customerId: customerId
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

const deleteBoooking = async (customerId: string, bookingId: string): Promise<ApiResponse<unknown>> => {
  try {
    await db.booking.delete({
      where: {
        id: bookingId,
        customerId: customerId
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
