import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const baseUrl = import.meta.env.VITE_API_URL
const token = localStorage.getItem("token")
export const getIncidentDataByMarkerId = createAsyncThunk(
  "incidents/getIncidentDataByMarkerId",
  async (markerId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/volunteer/incidents/${markerId}`,
        {
          headers: {
            Authorization: `${token}`
          }
        }
      )

      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)
