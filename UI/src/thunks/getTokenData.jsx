import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const tkn = localStorage.getItem("token")
export const getTokenData = createAsyncThunk("user/getTokenData", async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/volunteer/get-UserData",
      {
        headers: {
          Authorization: `
           ${tkn}`
        }
      }
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
})
