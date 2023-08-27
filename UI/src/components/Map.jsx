import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarkers } from "../thunks/getmarkers";
import { useLocation, useNavigate } from "react-router-dom";
import RateModal from "./RateModal";
import { Button, Card, CheckIcon, Loader, Notification } from "@mantine/core";
import { IconCircleXFilled } from "@tabler/icons-react";

import "leaflet/dist/leaflet.css"; // Leaflet CSS dosyasını ekleyin
import { map, marker } from "leaflet";

const Map = ({ location }) => {
  const mapRef = useRef(null); // Harita nesnesine erişim için ref oluşturun
  const locations = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [center, setCenter] = useState({
    lat: location.latitude,
    lng: location.longitude,
  });
  const [dbMarkers, setDbMarkers] = useState([]);

  const user = useSelector((state) => state.user);
  const userRole = user.tokenData.role;

  useEffect(() => {
    dispatch(fetchMarkers())
      .unwrap()
      .then((markers) => {
        setDbMarkers(markers);
        setIsLoading(false);
        // Set loading state to false after markers are fetched
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Set loading state to false in case of error
      });
  }, [dispatch]);

  const AddMarkerOnClick = () => {
    useMapEvent("click", (e) => {
      const newMarker = {
        position: e.latlng,
        address: "Yeni İşaret",
      };
      setDbMarkers([...dbMarkers, newMarker]);
      navigate(
        `/create-marker/${newMarker.position.lat}/${newMarker.position.lng}`
      );
    });
    return null;
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setShowModal(true);
  };
  const handleCardClick = (marker) => {
    setSelectedMarker(marker);
    setCenter(marker.position);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    if (userRole === "admin") {
      navigate(`/rate-marker/${selectedMarker._id}`);
    }
    if (userRole === "volunteer") {
      navigate(`/marker-details/${selectedMarker._id}`);
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    if (userRole === "admin") {
      navigate(`/marker-details/${selectedMarker._id}`);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={10}
        style={{ width: "375px", height: "300px", zIndex: 1 }}
      >
        <AddMarkerOnClick />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {dbMarkers &&
          dbMarkers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              title={marker.address}
              eventHandlers={{
                click: () => handleMarkerClick(marker),
              }}
            >
              {/* İşaret içeriği burada özelleştirilebilir */}
            </Marker>
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
      </MapContainer>
      {!isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
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
            transform: "translate(-50%, -50%)",
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
  );
};
export default Map;
