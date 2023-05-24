import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const token = localStorage.getItem("token")
export const getIncidentDataByMarkerId = createAsyncThunk(
  "incidents/getIncidentDataByMarkerId",
  async (markerId, thunkAPI) => {
    try {
      console.log(markerId)
      const response = await axios.get(
        `http://localhost:3000/api/volunteer/incidents/${markerId}`,
        {
          headers: {
            Authorization: `${token}`
          }
        }
      )

      const incident = response.data.incident
      console.log(incident)
      return incident
    } catch (error) {
      console.log(error)
    }
  }
)
