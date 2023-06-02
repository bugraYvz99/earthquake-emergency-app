import axios from "axios"
export const getMarkerByMarkerId = async (markerId) => {
  const token = localStorage.getItem("token")
  const baseUrl = import.meta.env.VITE_API_URL
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
