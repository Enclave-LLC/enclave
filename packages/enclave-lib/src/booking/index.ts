import { AxiosInstance } from "axios"
import UriPaths from "../utils/UriPaths"

// TODO to be implemented
interface BookingData {}

export default class BookingLib {
  #customFetch: AxiosInstance
  constructor(customFetch: AxiosInstance) {
    this.#customFetch = customFetch
  }

  async find(spaceId?: string) {
    const uri = UriPaths.bookingBase + (spaceId ? `?space=${spaceId}` : "")
    return this.#customFetch.get<BookingData[]>(uri).then((res) => res.data)
  }

  async create(bookingData: BookingData) {
    return this.#customFetch.post<BookingData>(UriPaths.bookingBase, bookingData).then((res) => res.data)
  }

  async update(bookingId: string, data: Partial<BookingData>) {
    const uri = `${UriPaths.bookingBase}/${bookingId}`
    return this.#customFetch.put<BookingData>(uri, data).then((res) => res.data)
  }

  async remove(bookingId: string) {
    const uri = `${UriPaths.bookingBase}/${bookingId}`
    await this.#customFetch.delete(uri)
  }
}
