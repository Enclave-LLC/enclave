import HttpErrors from "../../errors"
import { UserData, UserEntity } from "../../models/user/user.entity"
import { Vendor } from "../../models/user/vendor.entity"
import { BaseService } from "../base.service"

export class vendorService extends BaseService<Vendor> {
  // create vendor data for user
  async create(data: Vendor, authUser: UserData): Promise<Vendor> {
    const user = await UserEntity.findOne({
      where: { id: authUser.id },
      relations: { vendor: true }
    })
    if (user.isVendor) throw HttpErrors.BadRequest("Vendor already exists")
    const newVendor = new Vendor()
    newVendor.name = data.name
    user.vendor = newVendor
    await user.save()
    return newVendor
  }

  async update(id: string, data: Partial<Vendor>, authUser: UserData): Promise<Vendor> {
    const user = await UserEntity.findOne({
      where: { id: authUser.id },
      relations: { vendor: true }
    })
    if (!user.isVendor) throw HttpErrors.BadRequest("User not a vendor")
    for (const [key, value] of Object.entries(data)) user.vendor[key] = value
    await user.save()
    return user.vendor
  }
}
