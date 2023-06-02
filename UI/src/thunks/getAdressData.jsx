import { createAsyncThunk } from "@reduxjs/toolkit"

export const getAddressData = createAsyncThunk(
  
  "markers/getAddressData",
  async ({ lat, lng }, thunkAPI) => {
    
    const adressUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDXUM99i5wpXdDa8fqqW18TtwHKrQYimyE`
    try {
      const response = await fetch(adressUrl)
      const data = await response.json()
      return { address: data.results[0].formatted_address }
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
