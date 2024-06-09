import { GoogleMap, MarkerF } from "@react-google-maps/api"
import { useMaps } from "../context/MapContext"
import location from "../assets/png/location.png"
import { useEffect, useState } from "react"

const center = {
  lat: 7.946527,
  lng: -1.023194
}

interface GoogleMapWrapperProps {
  style?: React.CSSProperties
  coordinates: { lat: number; lng: number }
}

function GoogleMapWrapper({ coordinates, style }: GoogleMapWrapperProps): JSX.Element {
  const [coords, setCoords] = useState(center)
  const [markerIcon, setMarkerIcon] = useState<{ url: string; scaledSize: google.maps.Size } | undefined>(undefined)

  useEffect(() => {
    if (coordinates) {
      setCoords(coordinates)
    }
  }, [coordinates])

  useEffect(() => {
    if (window.google && window.google.maps) {
      setMarkerIcon({
        url: location,
        scaledSize: new window.google.maps.Size(50, 50)
      })
    }
  }, [window.google])

  const { isLoaded, loadError } = useMaps()

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading Maps</div>

  return (
    <GoogleMap mapContainerStyle={style} center={coords} zoom={10}>
      <MarkerF position={coords} icon={markerIcon} />
    </GoogleMap>
  )
}

export default GoogleMapWrapper
