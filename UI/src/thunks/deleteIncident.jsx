import axios from "axios"
const token = localStorage.getItem("token")
export const deleteIncident = async (incidentId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/volunteer/incidents/${incidentId}`,
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
