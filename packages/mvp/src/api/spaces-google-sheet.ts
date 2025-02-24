import { Space } from "@/types/spaces"
import axios from "axios"
import csv from "csvtojson"

interface GetSpacesOptions {
  signal?: AbortSignal
}

export async function getSpaces(options?: GetSpacesOptions): Promise<Space[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const sheets = await axios({
    method: "GET",
    // url: `https://sheetdb.io/api/v1/${import.meta.env.VITE_SHEETDB_API_ID}`,
    url: import.meta.env.VITE_SUPABASE_SPACES_CSV,
    signal: options?.signal
  })

  let spaces: Space[] = await csv().fromString(sheets.data)
  spaces = spaces.map(space => {
    const rate = parseFloat(space["Rates in Ghana Cedis"].replace(",", ""))
    const newRate = rate + (0.05 * rate)
    return { ...space, "Rates in Ghana Cedis": `${newRate}` }
  })
  return spaces
}

export interface BookingPayload {
  number_of_guests: number
  start_date: Date
  end_date?: Date
  start_time: string
  end_time: string
}

export async function createBooking(payload: BookingPayload) {
  await axios({
    method: "POST",
    url: `https://sheetdb.io/api/v1/${import.meta.env.VITE_SHEETDB_BOOKING_API_ID}`,
    data: payload
  })
}

export async function addCity(city: string) {
  await axios({
    method: "POST",
    url: `https://sheetdb.io/api/v1/${import.meta.env.VITE_SHEETDB_API_ID}`,
    data: {
      city
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// export async function searchSpaces(q: string) {}