/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpErrors from "../../errors"
import { UserData, UserEntity } from "../../models/user/user.entity"
import { BaseService } from "../base.service"

export class userService extends BaseService<UserEntity> {
  find(query: Partial<UserEntity>): Promise<UserEntity[]> {
    return UserEntity.find({ relations: { vendor: true } })
  }

  async get(id: string): Promise<UserEntity> {
    const user = await UserEntity.findOne({ where: { id } })
    if (!user) throw HttpErrors.NotFound("user not found!")
    return user
  }

  async update(id: string, data: Partial<UserEntity>, authUser: UserData): Promise<UserEntity> {
    const user = await UserEntity.findOne({ where: { id: authUser.id } })
    if (!user) throw HttpErrors.NotFound()
    for (const [key, value] of Object.entries(data)) user[key] = value
    await user.save()
    return user
  }
}
