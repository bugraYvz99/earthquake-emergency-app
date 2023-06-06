import axios from "axios"
import config from "../config"

const token = localStorage.getItem("token")
const baseUrl = config.baseUrl
export const deleteIncident = async (incidentId) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/volunteer/incidents/${incidentId}`,
      {
        headers: {
          Authorization: `${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    throw new Error("Error deleting incident")
  }
}
