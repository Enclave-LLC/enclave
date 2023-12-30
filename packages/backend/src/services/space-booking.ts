import io from "../../lib/io"
import logger from "../../lib/logger"
import db from "../db"
import { ApiResponse, HttpStatusCodes } from "../types"
import { SpaceBookingPayload } from "../types/space-booking"

const createNewBooking = async (payload: SpaceBookingPayload): Promise<ApiResponse<unknown>> => {
  try {
    const newBooking = await db.booking.create({
      data: {
        customerId: payload.customerId,
        spaceId: payload.spaceId,
        startDate: payload.startDate,
        endDate: payload.endDate
      },
      include: {
        space: {
          select: {
            spaceOwnerId: true
          }
        }
      }
    })

    // After a new booking request has been created, notify the space owner
    if (newBooking.space.spaceOwnerId) {
      //Emit a websocket event to the space owner
      const userSocket = io.getUserSocket(newBooking.space.spaceOwnerId)
      if (userSocket)
        userSocket.emit("new-booking-request", {
          spaceId: newBooking.spaceId,
          bookingId: newBooking.id
        })
    }

    return {
      code: HttpStatusCodes.OK,
      message: "success",
      data: {
        id: newBooking.id
      }
    }
  } catch (err) {
    logger.log("err", "an error occured")
    return {
      code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      message: "failure"
    }
  }
}

export default {
  createNewBooking
}
