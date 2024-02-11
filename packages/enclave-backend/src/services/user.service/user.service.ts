/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpErrors from "../../errors"
import { User } from "../../models/user/user.entity"
import { BaseService } from "../base.service"

export class userService extends BaseService<User> {
  find(query: Partial<User>): Promise<User[]> {
    return User.find()
  }

  async get(_id: string): Promise<User> {
    const id = parseInt(_id)
    const user = await User.findOne({ where: { id } })
    if (!user) throw HttpErrors.NotFound("user not found!")
    return user
  }

  async update(query: Partial<User>, data: Partial<User>): Promise<User> {
    const user = await User.findOne({ where: { id: query.id } })
    if (!user) throw HttpErrors.NotFound()
    for (const [key, value] of Object.entries(data)) user[key] = value
    await user.save()
    return user
  }
}
