import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

let token = localStorage.getItem("token")
export const fetchMarkers = createAsyncThunk(
  "markers/fetchMarkers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/volunteer/markers",
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
