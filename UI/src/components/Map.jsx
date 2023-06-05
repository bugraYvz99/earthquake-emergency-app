import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarkers } from "../thunks/getmarkers";
import { useNavigate } from "react-router-dom";
import RatingInput from "./RatingInput";
import RateModal from "./RateModal";
import { Loader } from "@mantine/core";

const containerStyle = {
  width: "375px",
  height: "300px"
};

const libraries = ["geometry", "drawing"];

const Map = ({ location }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  const [dbMarkers, setDbMarkers] = useState([]);
  const { isLoaded: isApiLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDXUM99i5wpXdDa8fqqW18TtwHKrQYimyE",
    libraries
  });
  const center = {
    lat: location.latitude,
    lng: location.longitude
  };
  const user = useSelector((state) => state.user);
  const userRole = user.tokenData.role;

  useEffect(() => {
    dispatch(fetchMarkers())
      .unwrap()
      .then((markers) => {
        setDbMarkers(markers);
        setIsLoading(false); // Set loading state to false after markers are fetched
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Set loading state to false in case of error
      });
  }, [dispatch]);

  const handleMapClick = (e) => {
    if (e && e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      navigate(`/create-marker/${lat}/${lng}`);
    }
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setShowModal(true);
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
    <div className="flex justify-center" style={{ flexGrow: 1 }}>
      {isLoading ? (
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
        isApiLoaded && (
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
              />
            )}
          </GoogleMap>
        )
      )}
    </div>
  );
            }
            export default Map