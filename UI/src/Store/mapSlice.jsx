import { createSlice } from "@reduxjs/toolkit"

const mapSlice = createSlice({
  name: "map",
  initialState: {
    markers: [],
    selectedMarker: null
  },
  reducers: {
    addMarker: (state, action) => {
      state.markers.push(action.payload)
    },
    selectMarker: (state, action) => {
      state.selectedMarker = {
        address: action.payload.address,
        position: {
          lat: action.payload.position.lat,
          lng: action.payload.position.lng
        },
        binaAdi: action.payload.binaAdi,
        hasarMiktari: action.payload.hasarMiktari
      }
    }
  }
})

export const { addMarker, selectMarker } = mapSlice.actions
export default mapSlice.reducer
