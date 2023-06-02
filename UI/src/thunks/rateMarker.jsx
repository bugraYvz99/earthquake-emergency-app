import { createAsyncThunk } from "@reduxjs/toolkit"

// Marker'ı puanlama işlemi için Redux Thunk
export const rateMarker = createAsyncThunk(
  "markers/rateMarker",
  async ({ markerId, puan }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token") // Yetkilendirme token'ınızı buraya yerleştirin
      const baseUrl = import.meta.env.VITE_API_URL
      const response = await fetch(
        `${baseUrl}/volunteer/markers/${markerId}/rateMarker`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`
          },
          body: JSON.stringify({ puan })
        }
      )

      const data = await response.json()

      if (response.ok) {
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
