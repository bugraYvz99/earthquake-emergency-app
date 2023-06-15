import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import config from "../config"
const tkn = localStorage.getItem("token")
const baseUrl = config.baseUrl
export const getTokenData = createAsyncThunk("user/getTokenData", async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/volunteer/get-UserData`, {
      headers: {
        Authorization: `
           ${tkn}`
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error)
  }
})
