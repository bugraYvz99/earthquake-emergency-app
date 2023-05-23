import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addMarker } from "../Store/mapSlice";

const MARKERS_URL = "http://localhost:3000/api/volunteer/markers";
const INCIDENTS_URL = "http://localhost:3000/api/volunteer/saveIncident";

export const postMarker = createAsyncThunk(
  "map/postMarker",
  async ({ markerData, incidentData }, { dispatch }) => {
    try {
      const token = localStorage.getItem("token"); // Kullanıcının token bilgisi

      // Marker'ı post et ve markerId'yi al
      const markerResponse = await axios.post(MARKERS_URL, markerData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const markerId = markerResponse.data.marker._id; // Marker'ın ID'si
console.log(markerResponse.data.marker._id)
      // Incident'ı oluştur ve markerId'yi içine ekle
      const incidentWithMarkerId = {
        ...incidentData,
        markerId: markerId, // Add markerId as a property in incidentData
      };
      const incidentResponse = await axios.post(INCIDENTS_URL, incidentWithMarkerId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },


      });




      if (incidentResponse.status === 201) {
        // İşlem başarılı, marker'ı ekleyerek true dön
        console.log("başarılı")
        dispatch(addMarker(markerResponse.data));
        return true;
      } else {
        console.log("Incident post request failed");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);
