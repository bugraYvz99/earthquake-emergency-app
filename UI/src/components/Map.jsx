import React, { useEffect, useState } from "react"
// Google map Komponentleri.
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useDispatch, useSelector } from "react-redux"
import { fetchMarkers } from "../thunks/getmarkers"
import { useLocation, useNavigate } from "react-router-dom"
import RateModal from "./RateModal"
import { Button, Card, CheckIcon, Loader, Notification } from "@mantine/core"
import { IconCircleXFilled } from "@tabler/icons-react"
const containerStyle = {
  width: "375px",
  height: "300px"
}

const libraries = ["geometry", "drawing"]

const Map = ({ location }) => {
  const locations = useLocation()
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

  // Google map api'si ile haritanın yüklenmesini gerçekleştiren Script.
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
        setIsLoading(false)
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
        // Google mapin Render olmasını sağlayan komponent ->
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
      {dbMarkers && !isLoading ? (
        <div className="flex flex-col justify-center items-center">
          {dbMarkers.map((marker, index) => (
            <Card
              className="hover:bg-gray-100 hover:h-40"
              mt={10}
              bg={"cyan"}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              w={"95%"}
              key={index}
              onClick={() => handleCardClick(marker)}
            >
              <p className="flex justify-center bg-slate-300 font-semibold">
                Olay {index + 1}
              </p>
              <p>Adres: {marker.address}</p>
              <p>
                İşaret güvenilirliği:{" "}
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
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <Loader />
        </div>
      )}

      {locations.state && locations.state.showNotification && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <Notification
            w={350}
            icon={
              locations.state.notificationText.includes("Başarılı") ||
              "başarılı" ? (
                <CheckIcon size="1.1rem" />
              ) : (
                <IconCircleXFilled />
              )
            }
            onClose={() => navigate("/page1", { state: null })}
            shadow={true}
            color={
              locations.state.notificationText.includes("Başarılı") ||
              "başarılı"
                ? "teal"
                : "red"
            }
            style={{ marginTop: "1rem" }}
          >
            <div className="mt-8">{locations.state.notificationText}</div>
            <Button onClick={() => navigate("/page1", { state: null })}>
              Close
            </Button>
          </Notification>
        </div>
      )}
    </div>
  )
}
export default Map
