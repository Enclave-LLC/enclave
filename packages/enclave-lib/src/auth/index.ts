import { AxiosInstance } from "axios"
import UriPaths from "../UriPaths"

export type UserData = {
  firstname: string
  lastname: string
}

export type AuthUser = {
  token: string
  userData: UserData & { isVendor: boolean }
}

export default class Auth {
  #customFetch: AxiosInstance
  constructor(customFetch: AxiosInstance) {
    this.#customFetch = customFetch
  }

  async authenticate(email: string, password: string) {
    const res = await this.#customFetch
      .post<AuthUser>(UriPaths.authenticate, { email, password })
      .then((res) => res.data)
    setLocalAuth(res)
    return res
  }

  async register(email: string, password: string, userData: UserData) {
    const res = await this.#customFetch
      .post<AuthUser>(UriPaths.register, { email, password, userData })
      .then((res) => res.data)
    setLocalAuth(res)
    return res
  }

  async getUser(): Promise<AuthUser | undefined> {
    return getLocalAuth()
  }

  async logout() {
    removeLocalAuth()
  }

  async checkEmail(email: string) {
    return this.#customFetch.post<{ isAvailable: boolean }>(UriPaths.validateEmail, { email }).then((res) => res.data)
  }
}

// LOCAL AUTH TOKEN STORAGE!
// CAN BE CHANGED TO INTERFACE SOMETHING ELSE
const LOCAL_AUTH_KEY = "enclave-auth"

export function setLocalAuth(data: AuthUser) {
  localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(data))
}

export function getLocalAuth() {
  const str = localStorage.getItem(LOCAL_AUTH_KEY)
  if (!str) return
  try {
    const authUser = JSON.parse(str) as AuthUser
    // TODO do proper check with a decoder
    if (!authUser.token || !authUser.userData) return
    return authUser
  } catch (err) {
    console.error(err)
  }
}

function removeLocalAuth() {
  localStorage.removeItem(LOCAL_AUTH_KEY)
}
