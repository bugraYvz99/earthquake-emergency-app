import React, { useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Button, Card } from "@mantine/core"

const RatingInput = () => {
  const [rating, setRating] = useState(0)
  const { markerId } = useParams()
  const handleRatingChange = (event) => {
    setRating(event.currentTarget.value)
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
  console.log(rating)
  return (
    <Card top={20} h={350}>
      <h2 className="mb-2 mt-2 font-semibold text-xl ">
        İşaretçinin güvenilirliği için puan ver
      </h2>
      <select
        value={rating}
        onChange={handleRatingChange}
        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md"
      >
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <Button
        variant="outline"
        className="mt-2 text-blue-500"
        onClick={handleRateMarker}
      >
        Puanla
      </Button>
    </Card>
  )
}

export default RatingInput
