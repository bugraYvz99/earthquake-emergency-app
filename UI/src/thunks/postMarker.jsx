import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
      const baseUrl = import.meta.env.VITE_API_URL

const MARKERS_URL = `${baseUrl}/api/volunteer/markers`

export const postMarker = createAsyncThunk(
  "map/postMarker",
  async ({ markerData, incidentData }) => {
    try {
      const token = localStorage.getItem("token") // User's token information
      const response = await axios.post(
        MARKERS_URL,
        { ...markerData, incidentData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`
          }
        }
      )
      console.log(markerData)
      console.log(response.data)

      if (response.status === 200) {
        // Successful request, handle the response data as needed
        return true
      } else {
        console.log("Marker post request failed")
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
)
