import React, { useEffect, useState } from "react";
import L from "leaflet";

import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import logo from "/logo.png";
const MarkerDetailMap = ({ markerData }) => {
  const myIcon = new L.Icon({
    iconUrl: logo,
    iconRetinaUrl: logo,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
  });
  if (
    !markerData ||
    !markerData.position ||
    !markerData.position.lat ||
    !markerData.position.lng
  ) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center">
      <MapContainer
        center={markerData.position}
        style={{ width: "375px", height: "300px", zIndex: 1 }}
        zoom={10}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={markerData.position} icon={myIcon}>
          {/* İşaret içeriği burada özelleştirilebilir */}
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MarkerDetailMap;
