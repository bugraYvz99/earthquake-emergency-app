import axios from "axios"

 
const token = localStorage.getItem("token")
const baseUrl = import.meta.env.VITE_API_URL
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
