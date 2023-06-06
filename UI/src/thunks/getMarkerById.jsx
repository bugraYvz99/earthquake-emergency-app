import axios from "axios"
import config from "../config"
export const getMarkerByMarkerId = async (markerId) => {
  const token = localStorage.getItem("token")
  const baseUrl = config.baseUrl
  try {
    const response = await axios.get(
      `${baseUrl}/api/volunteer/markers/${markerId}`,
      {
        headers: {
          Authorization: `
           ${token}`
        }
      }
    )
    return response.data.marker
  } catch (error) {
    console.error(error)
    throw new Error("Error fetching marker by ID")
  }
}
