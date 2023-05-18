import {
  Marker,
  GoogleMap,
  useJsApiLoader,
  InfoWindow
} from "@react-google-maps/api"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addMarker, selectMarker } from "../Store/mapSlice"
import MyStepper from "./MyStepper"
import InfoWindowContent from "./InfoWindowContent"
import { postMarker } from "../thunks/postMarker"
import { getAddressData } from "../thunks/getAdressData"
import { rateMarker } from "../thunks/rateMarker"
import { fetchMarkers } from "../thunks/getmarkers"

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
  const dispatch = useDispatch()
  const [markers, setMarkers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [showStepper, setShowStepper] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [clickedLocation, setClickedLocation] = useState(null)
  const [showInput, setShowInput] = useState(false)
  const [dbMarkers, setDbMarkers] = useState([])

  const [rate, setRate] = useState(0)

  const storeMarkers = useSelector((state) => state.map.markers || [])
  useEffect(() => {
    dispatch(fetchMarkers())
      .then((result) => {
        setDbMarkers(result.payload)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  console.log(dbMarkers)

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
        address: payload.address,
        rate
      }
      const resultAction = await dispatch(postMarker(newMarker))
      if (postMarker.fulfilled.match(resultAction)) {
        setMarkers([...markers, resultAction.meta.arg])
        setDbMarkers([...dbMarkers, resultAction.meta.arg])
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

  const handleMarkerRateClick = (marker) => {
    setRate(0) // Clear rate input value
    setShowInput(false) // Hide rate input
    dispatch(selectMarker(marker))
    setShowInput(true)
  }

  const handlePuanChange = (e) => {
    setRate(Number(e.target.value))
  }
  const selectedMarker = useSelector((state) => state.map.selectedMarker)
  const handlePuanBlur = () => {
    setShowInput(false)
    if (selectedMarker && selectedMarker._id) {
      // Add a conditional check
      const markerId = selectedMarker._id
      dispatch(rateMarker({ markerId, rate }))
        .then((result) => {
          console.log("Marker puanlandı.", result)
        })
        .catch((error) => {
          console.error("Marker puanlama işlemi başarısız oldu.", error)
        })
    }
  }

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
            {dbMarkers &&
              dbMarkers.map((marker, index) => (
                <Marker
                  key={index}
                  position={marker.position}
                  onClick={() => handleMarkerRateClick(marker)}
                  title={marker.address}
                  clickable={true}
                  draggable={true}
                ></Marker>
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
        {showInput && (
          <div>
            <p>rate this marker</p>
            <input
              type="number"
              value={rate}
              onChange={handlePuanChange}
              onBlur={handlePuanBlur}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default Map
