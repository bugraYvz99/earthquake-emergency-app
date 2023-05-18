import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { addMarker } from "../Store/mapSlice"

const MARKERS_URL = "http://localhost:3000/api/volunteer/markers"

export const postMarker = createAsyncThunk(
  "map/postMarker",
  async (newMarker, { dispatch }) => {
    try {
      const token = localStorage.getItem("token") // Kullanıcının token bilgisi

      const response = await axios.post(MARKERS_URL, newMarker, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        dispatch(addMarker(response.data))
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
