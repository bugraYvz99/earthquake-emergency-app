import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarkers } from "../thunks/getmarkers";
import { useLocation, useNavigate } from "react-router-dom";
import RateModal from "./RateModal";
import { Loader } from "@mantine/core";
import { Card } from "@mantine/core";

import "leaflet/dist/leaflet.css"; // Leaflet CSS dosyasını ekleyin
import CustomNotification from "./notification/CustomNotification";

const Map = ({ location }) => {
  const loc = useLocation();
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
  console.log(loc);
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
  console.log(dbMarkers);
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
      <div className=" flex flex-col justify-center items-center w-2/3 gap-4 mt-4">
        {dbMarkers &&
          dbMarkers.map((marker, index) => (
            <Card w={"100%"} bg="blue" key={index}>
              {" "}
              <p className=" font-bold text-lg">
                {" "}
                {"Kullanıcı:" + " " + marker.userName}
              </p>
              <p className="mt-2">
                {" "}
                {"Adres:" + JSON.stringify(marker.position)}
              </p>
              <p className="mt-2 text-red-400">
                {" "}
                {"Kullanıcı Telefon Numarası:" + marker.userNumber}
              </p>
            </Card>
          ))}
      </div>
      {isLoading && (
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
      {loc.state && <CustomNotification />}
    </div>
  );
};
export default Map;
