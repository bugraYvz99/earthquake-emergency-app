import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import React, { useEffect, useState } from "react"

const containerStyle = {
  width: "400px",
  height: "150px"
}

const libraries = ["geometry", "drawing"]

const MarkerDetailMap = ({ markerData }) => {
  const { isLoaded: isApiLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDXUM99i5wpXdDa8fqqW18TtwHKrQYimyE",
    libraries
  })

  const [map, setMap] = useState(null)

  const onLoad = (map) => {
    setMap(map)
  }

  useEffect(() => {
    if (
      map &&
      markerData &&
      markerData.position &&
      markerData.position.lat &&
      markerData.position.lng
    ) {
      const center = {
        lat: markerData.position.lat,
        lng: markerData.position.lng
      }
      const marker = new window.google.maps.Marker({
        position: center,
        map: map,
        icon: {
          url: "/logo.png",
          scaledSize: new window.google.maps.Size(30, 30)
        }
      })
    }
  }, [map, markerData])

  if (loadError) {
    return <p>Error loading Google Maps API</p>
  }

  if (
    !isApiLoaded ||
    !markerData ||
    !markerData.position ||
    !markerData.position.lat ||
    !markerData.position.lng
  ) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex justify-center">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerData.position}
        zoom={10}
        onLoad={onLoad}
      >
        {map && (
          <Marker
            position={markerData.position}
            icon={{
              url: "/logo.png",
              scaledSize: new window.google.maps.Size(30, 30)
            }}
          />
        )}
      </GoogleMap>
    </div>
  )
}

export default MarkerDetailMap
