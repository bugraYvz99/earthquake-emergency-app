import React, { useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const RatingInput = () => {
  const [rating, setRating] = useState(0)
  const { markerId } = useParams()

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10))
  }
  const token = localStorage.getItem("token")
  const handleRateMarker = () => {
    const url = `http://localhost:3000/api/admin/markers/${markerId}/rateMarker`
    const data = { puan: rating }

    axios
      .post(url, data, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then((response) => {
        console.log(response.data) // Handle the response data as needed
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div>
      <p>Rate this marker</p>
      <input
        type="number"
        min="0"
        max="5"
        value={rating}
        onChange={handleRatingChange}
      />
      <button onClick={handleRateMarker}>Rate</button>
    </div>
  )
}

export default RatingInput
