import { FindOneOptions } from "typeorm/find-options/FindOneOptions"
import HttpErrors from "../../errors"
import { Booking, BookingEntity } from "../../models/booking/booking.entity"
import { SpaceEntity } from "../../models/space/space.entity"
import { UserData, UserEntity } from "../../models/user/user.entity"
import { BaseService } from "../base.service"

export class bookingService extends BaseService<Booking> {
  // can be called with no query data to get all user|vendor bookings.
  // can be called with a query {space: {id}} to get all bookings on a space
  async find(query: Partial<Booking>, authUser: UserData): Promise<Booking[]> {
    const isSpaceQuery = !!query?.space
    const spaceId = query.space + ""

    const getUserBookingWhere = (): FindOneOptions<BookingEntity>["where"] => [
      { user: { id: authUser.id } },
      { space: { vendor: { id: authUser.id } } }
    ]

    const getSpaceBookingWhere = (): FindOneOptions<BookingEntity>["where"] => [
      { space: { id: spaceId, vendor: { id: authUser.id } } },
      { space: { id: spaceId }, user: { id: authUser.id } }
    ]

    const bookings = await BookingEntity.find({
      where: isSpaceQuery ? getSpaceBookingWhere() : getUserBookingWhere()
    })
    return bookings
  }

  async create(data: Booking, authUser: UserData): Promise<Booking> {
    const user = await UserEntity.findOne({
      where: { id: authUser.id },
      relations: { vendor: true }
    })
    if (!user) throw HttpErrors.NotFound("user not found")
    if (!data?.space?.id)
      // TODO a request body schema validator can deal with this
      throw HttpErrors.BadRequest("{ space.id } is required in your request body")
    const space = await SpaceEntity.findOne({ where: { id: data.space.id } })
    if (!space) throw HttpErrors.NotFound("space not found")

    const newBooking = new BookingEntity()
    newBooking.user = user
    newBooking.space = space
    await newBooking.save()
    return newBooking
  }

  async update(id: string, data: Partial<Booking>, authUser: UserData): Promise<Booking> {
    const booking = await BookingEntity.findOne({
      where: [
        { id, user: { id: authUser.id } },
        { id, space: { vendor: { id: authUser.id } } }
      ]
    })
    if (!booking) throw HttpErrors.NotFound("Booking not found!")

    for (const [key, value] of Object.entries(data)) booking[key] = value
    await booking.save()
    return booking
  }

  async delete(id: string, authUser: UserData): Promise<Booking> {
    const booking = await BookingEntity.findOne({
      where: [
        { id, user: { id: authUser.id } },
        { id, space: { vendor: { id: authUser.id } } }
      ]
    })
    if (!booking) throw HttpErrors.NotFound("Booking not found!")
    await booking.remove()
    return booking
  }
}
