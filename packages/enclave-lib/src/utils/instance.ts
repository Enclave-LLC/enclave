import axios from "axios"
import { getLocalAuth } from "../auth"

export function initCustomFetch(baseURL: string) {
  const customFetch = axios.create({
    baseURL,
    timeout: 1000
  })

  customFetch.interceptors.request.use(function (config) {
    const data = getLocalAuth()
    if (data) config.headers.Authorization = `Bearer ${data.token}`
    return config
  })
  return customFetch
}
