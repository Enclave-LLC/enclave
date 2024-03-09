import { GoogleMap, MarkerF } from "@react-google-maps/api"
import { useMaps } from "../context/MapContext"
import location from "../assets/png/location.png"
import { useEffect, useState } from "react"

const containerStyle = {
  width: "100%",
  height: "400px"
}

const center = {
  lat: 7.946527,
  lng: -1.023194
}

interface GoogleMapWrapperProps {
  coordinates: { lat: number; lng: number }
}

function GoogleMapWrapper({ coordinates }: GoogleMapWrapperProps): JSX.Element {
  const [coords, setCoords] = useState(center)

  useEffect(() => {
    if (coordinates) {
      setCoords(coordinates)
    }
  }, [coordinates])

  const { isLoaded, loadError } = useMaps()
  const markerIcon = {
    url: location,
    scaledSize: new window.google.maps.Size(50, 50)
  }

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading Maps</div>

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={coords} zoom={10}>
      <MarkerF position={coords} icon={markerIcon} />
    </GoogleMap>
  )
}

export default GoogleMapWrapper
