import { AxiosInstance } from "axios"
import { UserData } from "../auth"
import UriPaths from "../utils/UriPaths"

export type VendorData = {
  name: string
}

export default class UserLib {
  #customFetch: AxiosInstance
  constructor(customFetch: AxiosInstance) {
    this.#customFetch = customFetch
  }

  async updateInfo(userData: UserData) {
    // TODO think of return type!
    // TODO how do we update the local auth data!
    await this.#customFetch.put(UriPaths.updateUserInfo, userData).then((res) => res.data)
  }

  async optInVendor(vendorData: VendorData) {
    // TODO think of return type
    // TODO how do we update the local auth data!
    await this.#customFetch.post(UriPaths.optInVendor, vendorData).then((res) => res.data)
  }

  async updateVendorInfo(vendorData: Partial<VendorData>) {
    // TODO think of return type
    // TODO how do we update the local auth data!
    await this.#customFetch.put(UriPaths.updateVendorInfo, vendorData).then((res) => res.data)
  }
}
