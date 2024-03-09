import { createContext, useContext } from "react"
import { useLoadScript } from "@react-google-maps/api"

const MapsContext = createContext({
  isLoaded: false,
  loadError: undefined as Error | undefined
})

export function useMaps() {
  return useContext(MapsContext)
}

export const MapsProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  })

  const value = {
    isLoaded,
    loadError
  }

  return <MapsContext.Provider value={value}>{children}</MapsContext.Provider>
}
