import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getTokenData = createAsyncThunk(
  "user/getTokenData",
  async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/get-UserData",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
const tkn = localStorage.getItem("token")
console.log(getTokenData(tkn))