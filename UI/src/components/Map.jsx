import {
  Marker,
  GoogleMap,
  useJsApiLoader,
  InfoWindow
} from "@react-google-maps/api"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addMarker, selectMarker } from "../Store/mapSlice"
import MyStepper from "./MyStepper"
import InfoWindowContent from "./InfoWindowContent"
import { postMarker } from "../thunks/postMarker"
import { getAddressData } from "../thunks/getAdressData"

const containerStyle = {
  width: "375px",
  height: "300px"
}

const center = {
  lat: 39.745,
  lng: 32.523
}

const libraries = ["geometry", "drawing"]

const Map = () => {
  const [markers, setMarkers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [showStepper, setShowStepper] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [clickedLocation, setClickedLocation] = useState(null)

  const storeMarkers = useSelector((state) => state.map.markers || [])

  useEffect(() => {
    setIsLoaded(true)
  }, [])
  const handleMapClick = async (e) => {
    setShowStepper(true)
    setClickedLocation(e.latLng)
  }
  const handleStepperComplete = async (binaAdi, hasarMiktari) => {
    setShowStepper(false)
    setActiveStep(0)
    const lat = clickedLocation.lat()
    const lng = clickedLocation.lng()

    try {
      const { payload } = await dispatch(getAddressData({ lat, lng }))
      const newMarker = {
        position: {
          lat: lat,
          lng: lng
        },
        binaAdi,
        hasarMiktari,
        address: payload.address
      }
      const resultAction = await dispatch(postMarker(newMarker))
      if (postMarker.fulfilled.match(resultAction)) {
        setMarkers([...markers, resultAction.meta.arg])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const { isLoaded: isApiLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDXUM99i5wpXdDa8fqqW18TtwHKrQYimyE",
    libraries
  })
  const dispatch = useDispatch()

  const handleMarkerClick = (marker) => {
    dispatch(selectMarker(marker))
  }
  const selectedMarker = useSelector((state) => state.map.selectedMarker)
  useEffect(() => {
    if (isLoaded) {
      setMarkers(storeMarkers)
    }
  }, [isLoaded, storeMarkers])
  useEffect(() => {
    setMarkers([])
  }, [isApiLoaded])

  return (
    <div className="flex flex-col">
      <div style={{ flexGrow: 1 }}>
        {isApiLoaded && (
          <GoogleMap
            onClick={handleMapClick}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {markers &&
              markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={marker.position}
                  onClick={() => handleMarkerClick(marker)}
                  title={marker.address}
                  clickable={true}
                  draggable={true}
                >
                  {selectedMarker && (
                    <InfoWindow position={selectedMarker.position}>
                      <InfoWindowContent
                        position={selectedMarker.position}
                        binaAdi={selectedMarker.binaAdi}
                        hasarMiktari={selectedMarker.hasarMiktari}
                      />
                    </InfoWindow>
                  )}
                </Marker>
              ))}
          </GoogleMap>
        )}
        {showStepper && (
          <div className="">
            <MyStepper
              activeStep={activeStep}
              onComplete={handleStepperComplete}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default Map
