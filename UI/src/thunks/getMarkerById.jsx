import axios from "axios"
export const getMarkerByMarkerId = async (markerId) => {
  const token = localStorage.getItem("token")
  try {
    const response = await axios.get(
      `http://localhost:3000/api/volunteer/markers/${markerId}`,
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
