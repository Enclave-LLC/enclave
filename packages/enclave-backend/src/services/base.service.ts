/* eslint-disable @typescript-eslint/no-unused-vars */
// Isn't the above eslint ignore annoying!!!
import HttpErrors from "../errors"

export class BaseService<T> {
  async find(query: Partial<T>): Promise<T[]> {
    throw HttpErrors.NotFound()
  }
  async get(id: string): Promise<T> {
    throw HttpErrors.NotFound()
  }
  async create(data: T): Promise<T> {
    throw HttpErrors.NotFound()
  }
  async update(query: Partial<T>, data: Partial<T>): Promise<T> {
    throw HttpErrors.NotFound()
  }
  async delete(id: string): Promise<T> {
    throw HttpErrors.NotFound()
  }
}
