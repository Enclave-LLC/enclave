/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpErrors from "../errors"
import { AuthUserType } from "./auth.service/auth.service"

export class BaseService<T> {
  async find(query: Partial<T>, authUser: AuthUserType): Promise<T[]> {
    throw HttpErrors.NotFound()
  }
  async get(id: string, authUser: AuthUserType): Promise<T> {
    throw HttpErrors.NotFound()
  }
  async create(data: T, authUser: AuthUserType): Promise<T> {
    throw HttpErrors.NotFound()
  }
  async update(id: string, data: Partial<T>, authUser: AuthUserType): Promise<T> {
    throw HttpErrors.NotFound()
  }
  async delete(id: string, authUser: AuthUserType): Promise<T> {
    throw HttpErrors.NotFound()
  }
}
