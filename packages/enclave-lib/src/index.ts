import AuthLib from "./auth"
import { initCustomFetch } from "./utils/instance"
import UserLib from "./user"

export interface EnclaveOptions {
  baseUrl: string
}

export class Enclave {
  auth: AuthLib
  user: UserLib
  constructor(options: EnclaveOptions) {
    const customFetch = initCustomFetch(options.baseUrl)
    this.auth = new AuthLib(customFetch)
    this.user = new UserLib(customFetch)
  }
}
