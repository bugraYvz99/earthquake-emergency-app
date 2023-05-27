import axios from "axios"

export const postIncident = async (markerId, incidentData) => {
  const token = localStorage.getItem("token")
  try {
    const response = await axios.post(
      `http://localhost:3000/api/volunteer/incidents`,
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
