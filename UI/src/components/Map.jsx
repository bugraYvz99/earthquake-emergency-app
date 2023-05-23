import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarkers } from "../thunks/getmarkers";

import { useNavigate } from 'react-router-dom';



const containerStyle = {
  width: "375px",
  height: "300px"
};

const center = {
  lat: 39.745,
  lng: 32.523
};

const libraries = ["geometry", "drawing"];

const Map = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dbMarkers, setDbMarkers] = useState([]);

  const { isLoaded: isApiLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDXUM99i5wpXdDa8fqqW18TtwHKrQYimyE",
    libraries
  });

  useEffect(() => {
    dispatch(fetchMarkers())
      .unwrap()
      .then((markers) => {
        setDbMarkers(markers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);
  const handleMapClick = (e) => {
    console.log(e)
    if (e && e.latLng) {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    navigate(`/create-marker/${lat}/${lng}`);
    }
  };
  return (
    <div style={{ flexGrow: 1 }}>
      {isApiLoaded && (
        <GoogleMap
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
              />
            ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
