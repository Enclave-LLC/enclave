/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from "react"
import { Input } from "component-library"
import { useMaps } from "../context/MapContext"

interface GMapsAutoCompleteSearchProps extends React.ComponentPropsWithRef<typeof Input> {
  updateCoords: (coordinates: { lat: number; lng: number }) => void
  setAddress: (address: string) => void
}

const GMapsAutoCompleteSearch = React.forwardRef<HTMLInputElement, GMapsAutoCompleteSearchProps>(
  ({ updateCoords, setAddress, ...props }: GMapsAutoCompleteSearchProps) => {
    const { isLoaded } = useMaps()

    const inputRef = useRef<any>(null)

    useEffect(() => {
      if (isLoaded) {
        // Initialize the Google Places Autocomplete
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current)
        autocomplete.setFields(["address_components", "geometry", "icon", "name"])
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace()
          console.log(place)
          if (place && place.name) setAddress(place.name)
          if (!place.geometry) {
            console.log("Returned place contains no geometry")
            return
          }
          const location = place.geometry.location
          if (location) {
            updateCoords({ lat: location.lat(), lng: location.lng() })
          }
        })
      }
    }, [isLoaded])

    return (
      <div>
        <Input {...props} ref={inputRef} type="text" placeholder="Search location..." />
      </div>
    )
  }
)

export default GMapsAutoCompleteSearch
