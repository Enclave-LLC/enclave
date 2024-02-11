import { AxiosInstance } from "axios"
import UriPaths from "../utils/UriPaths"

export enum Amenities {
  Parking = "parking",
  Catering = "catering"
}

export type SpaceData = {
  name: string
  address: string
  location: { lng: number; lat: number }
  size: number
  capacity: number
  amenities: Amenities[]
}

export default class SpaceLib {
  #customFetch: AxiosInstance
  constructor(customFetch: AxiosInstance) {
    this.#customFetch = customFetch
  }

  // TODO the find function will take a query or filter!!!
  async find() {
    return this.#customFetch.get<SpaceData[]>(UriPaths.spacesBase).then((res) => res.data)
  }

  async get(spaceId: string) {
    const uri = `${UriPaths.spacesBase}/${spaceId}`
    return this.#customFetch.get<SpaceData>(uri).then((res) => res.data)
  }

  async create(spaceData: SpaceData) {
    return this.#customFetch.post<SpaceData>(UriPaths.spacesBase, spaceData).then((res) => res.data)
  }
  async update(spaceId: string, spaceData: Partial<SpaceData>) {
    const uri = `${UriPaths.spacesBase}/${spaceId}`
    return this.#customFetch.put<SpaceData>(uri, spaceData).then((res) => res.data)
  }
  async remove(spaceId: string) {
    await this.#customFetch.delete(spaceId)
  }
}
