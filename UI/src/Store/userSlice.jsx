import { createSlice } from "@reduxjs/toolkit"
import { getTokenData } from "./thunks"

const userSlice = createSlice({
  name: "user",
  initialState: {
    tokenData: {},
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTokenData.pending, (state) => {
      state.status = "loading"
      state.error = null
    })
    builder.addCase(getTokenData.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.tokenData = action.payload
    })
    builder.addCase(getTokenData.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.error.message
    })
  }
})

export default userSlice.reducer
