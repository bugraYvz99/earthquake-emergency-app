import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

let token = localStorage.getItem("token")
const baseUrl = import.meta.env.VITE_API_URL
export const fetchMarkers = createAsyncThunk(
  "markers/fetchMarkers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/volunteer/markers`,
        {
          headers: {
            Authorization: `${token}`
          }
        }
      )
      const data = response.data
      return data.markers
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
