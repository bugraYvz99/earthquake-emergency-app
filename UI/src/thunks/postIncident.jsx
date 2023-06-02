import axios from "axios"

export const postIncident = async (markerId, incidentData) => {
  const token = localStorage.getItem("token")
  const baseUrl = import.meta.env.VITE_API_URL
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
    return response.data.incident
  } catch (error) {
    console.error(error)
    throw new Error("Error creating incident")
  }
}
