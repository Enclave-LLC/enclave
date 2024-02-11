import HttpErrors from "../../errors"
import { Booking, BookingEntity } from "../../models/booking/booking.entity"
import { UserData } from "../../models/user/user.entity"
import { BaseService } from "../base.service"

export class bookingService extends BaseService<Booking> {
  async create(data: Booking, authUser: UserData): Promise<Booking> {
    const newBooking = new BookingEntity()
    newBooking.userId = authUser.id + "" // FIXME user.id should be string
    newBooking.spaceId = data.spaceId
    await newBooking.save()
    return newBooking
  }

  async update(id: string, data: Partial<Booking>, authUser: UserData): Promise<Booking> {
    const booking = await BookingEntity.findOne({ where: { id } })
    if (!booking) throw HttpErrors.NotFound("Booking not found!")

    // allow user who booked and space owner to change booking!
    if (booking.userId !== authUser.id && booking.space.vendor.id !== authUser.id)
      throw HttpErrors.BadRequest("Not Allowed")
    for (const [key, value] of Object.entries(data)) booking[key] = value
    await booking.save()
    return booking
  }
}
