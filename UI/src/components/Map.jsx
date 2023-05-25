import React, { useEffect, useState } from "react"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useDispatch, useSelector } from "react-redux"
import { fetchMarkers } from "../thunks/getmarkers"

import { useNavigate } from "react-router-dom"
import RatingInput from "./RatingInput"
import RateModal from "./RateModal"

const containerStyle = {
  width: "375px",
  height: "300px"
}

const libraries = ["geometry", "drawing"]

const Map = ({ location }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState(null)

  const [dbMarkers, setDbMarkers] = useState([])
  console.log(location)
  const { isLoaded: isApiLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDXUM99i5wpXdDa8fqqW18TtwHKrQYimyE",
    libraries
  })
  const center = {
    lat: location.latitude,
    lng: location.longitude
  }
  const user = useSelector((state) => state.user)
  const userRole = user.tokenData.role
  useEffect(() => {
    dispatch(fetchMarkers())
      .unwrap()
      .then((markers) => {
        setDbMarkers(markers)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [dispatch])
  const handleMapClick = (e) => {
    console.log(e)
    if (e && e.latLng) {
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()
      navigate(`/create-marker/${lat}/${lng}`)
    }
  }
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker)
    setShowModal(true)
  }

  const handleModalConfirm = () => {
    setShowModal(false)
    if (userRole === "admin") {
      navigate(`/rate-marker/${selectedMarker._id}`)
    }
    if (userRole === "volunteer") {
      navigate(`/marker-details/${selectedMarker._id}`)
    }
  }
  const handleModalCancel = () => {
    setShowModal(false)
    if (userRole === "admin") {
      navigate(`/marker-details/${selectedMarker._id}`)
    }
  }
  return (
    <div style={{ flexGrow: 1 }}>
      {isApiLoaded && (
        <GoogleMap
          streetView={true}
          mapContainerStyle={containerStyle}
          center={center}
          onClick={handleMapClick}
          zoom={10}
        >
          {dbMarkers &&
            dbMarkers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
                title={marker.address}
                onClick={() => handleMarkerClick(marker)}
              />
            ))}
          {showModal && (
            <RateModal
              onConfirm={handleModalConfirm}
              onCancel={handleModalCancel}
              userRole={userRole}
              selectedMarker={selectedMarker}
            />
          )}
        </GoogleMap>
      )}
    </div>
  )
}

export default Map
