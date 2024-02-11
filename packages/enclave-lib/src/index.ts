import AuthLib from "./auth"
import BookingLib from "./booking"
import SpaceLib from "./space"
import UserLib from "./user"
import { initCustomFetch } from "./utils/instance"

export interface EnclaveOptions {
  baseUrl: string
}

export class Enclave {
  auth: AuthLib
  user: UserLib
  space: SpaceLib
  booking: BookingLib
  constructor(options: EnclaveOptions) {
    const customFetch = initCustomFetch(options.baseUrl)
    this.auth = new AuthLib(customFetch)
    this.user = new UserLib(customFetch)
    this.space = new SpaceLib(customFetch)
    this.booking = new BookingLib(customFetch)
  }
}
