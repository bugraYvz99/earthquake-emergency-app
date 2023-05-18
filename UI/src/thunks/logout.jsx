import { createAsyncThunk } from "@reduxjs/toolkit"

// Async thunk action creator for logout
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Perform any necessary cleanup tasks or API calls here

      // Clear the token (example function, implement according to your token management)
      localStorage.removeItem("token")

      // Return any relevant data
      return { success: true }
    } catch (error) {
      // Handle errors
      return rejectWithValue(error.message)
    }
  }
)
