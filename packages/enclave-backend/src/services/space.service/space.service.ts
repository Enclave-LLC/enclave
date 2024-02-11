/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpErrors from "../../errors"
import { Space, SpaceEntity } from "../../models/space/space.entity"
import { UserData, UserEntity } from "../../models/user/user.entity"
import { BaseService } from "../base.service"

export class spaceService extends BaseService<Space> {
  async find(query: Partial<Space>, authUser: UserData): Promise<Space[]> {
    return await SpaceEntity.find({ relations: { vendor: true } })
  }
  async create(data: Space, authUser: UserData): Promise<Space> {
    const user = await UserEntity.findOne({
      where: { id: authUser.id },
      relations: { vendor: true }
    })
    if (!user.isVendor) throw HttpErrors.BadRequest("Not Allowed")
    const newSpace = new SpaceEntity({
      name: data.name,
      address: data.address,
      amenities: data.amenities,
      capacity: data.capacity,
      location: data.location,
      size: data.size
    })
    newSpace.vendor = user.vendor
    await newSpace.save()
    return newSpace
  }

  async update(id: string, data: Partial<Space>, authUser: UserData): Promise<Space> {
    const space = await SpaceEntity.findOne({
      where: { id, vendor: { user: { id: authUser.id } } }
    })
    if (!space) throw HttpErrors.NotFound("Space does not exist")
    for (const [key, value] of Object.entries(data)) space[key] = value
    await space.save()
    return space
  }

  async delete(id: string, authUser: UserData): Promise<Space> {
    const space = await SpaceEntity.findOne({
      where: { id, vendor: { user: { id: authUser.id } } }
    })
    if (!space) throw HttpErrors.NotFound("Space does not exist")
    await space.remove()
    return space
  }
}
