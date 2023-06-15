import axios from "axios"
import config from "../config"

export const postIncident = async (markerId, incidentData) => {
  const token = localStorage.getItem("token")
  const baseUrl = config.baseUrl
  try {
    const response = await axios.post(
      `${baseUrl}/api/volunteer/incidents`,
      {
        markerId,
        incidentData
      },
      {
        headers: {
          Authorization: `${token}`
        }
      }
    )
    console.log(response)
    return response.status
  } catch (error) {
    console.error(error)
    throw new Error("Olay oluşturulamadı")
  }
}
