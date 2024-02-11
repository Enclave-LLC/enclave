import Auth from "./auth"
import { initCustomFetch } from "./instance"

export interface EnclaveOptions {
  baseUrl: string
}

export class Enclave {
  auth: Auth
  constructor(options: EnclaveOptions) {
    const customFetch = initCustomFetch(options.baseUrl)
    this.auth = new Auth(customFetch)
  }
}
