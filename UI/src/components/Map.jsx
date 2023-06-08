import React, { useEffect, useState } from "react"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useDispatch, useSelector } from "react-redux"
import { fetchMarkers } from "../thunks/getmarkers"
import { useNavigate } from "react-router-dom"
import RateModal from "./RateModal"
import { Card, Loader } from "@mantine/core"

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
  const [isLoading, setIsLoading] = useState(true) // State to track loading status
  const [center, setCenter] = useState({
    lat: location.latitude,
    lng: location.longitude
  })
  const [dbMarkers, setDbMarkers] = useState([])
  const { isLoaded: isApiLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDXUM99i5wpXdDa8fqqW18TtwHKrQYimyE",
    libraries
  })

  const user = useSelector((state) => state.user)
  const userRole = user.tokenData.role

  useEffect(() => {
    dispatch(fetchMarkers())
      .unwrap()
      .then((markers) => {
        setDbMarkers(markers)
        // Set loading state to false after markers are fetched
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false) // Set loading state to false in case of error
      })
  }, [dispatch])

  const handleMapClick = (e) => {
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
  const handleCardClick = (marker) => {
    setSelectedMarker(marker)
    setCenter(marker.position)
    window.scrollTo({ top: 0, behavior: "smooth" })
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
    <div className="flex justify-center items-center flex-col">
      {!isApiLoaded ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh"
          }}
        >
          <Loader />
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          onClick={handleMapClick}
          zoom={10}
        >
          {dbMarkers &&
            dbMarkers.map((marker, index) => (
              <Marker
                icon={{
                  url: "/earthquake.png",
                  scaledSize: new window.google.maps.Size(30, 30)
                }}
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
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </GoogleMap>
      )}
      {dbMarkers &&
        dbMarkers.map((marker, index) => (
          <Card
            className="mt-5 w-5/6 rounded-sm shadow-xl shadow-neutral-500"
            bg={"lime"}
            key={index}
            onClick={() => handleCardClick(marker)}
          >
            <p className="flex justify-center bg-slate-300 font-semibold">
              İşaretci {index + 1}
            </p>
            <p>Adres: {marker.address}</p>
            <p>
              İşaret güvenilirliği:{" 5/"}
              {marker.ratings.length > 0
                ? (
                    marker.ratings.reduce((a, b) => a + b) /
                    marker.ratings.length
                  ).toFixed(2)
                : 0}
            </p>
          </Card>
        ))}
    </div>
  )
}
export default Map
