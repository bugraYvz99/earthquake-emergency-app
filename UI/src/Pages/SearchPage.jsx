import React, { useState } from "react"
import axios from "axios"

export const SearchPage = () => {
  const [buildingSearchQuery, setBuildingSearchQuery] = useState("")
  const [personSearchQuery, setPersonSearchQuery] = useState("")
  const token = localStorage.getItem("token")

  const handleBuildingSearch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/volunteer/incidentTypeSearch",
        {
          params: { query: buildingSearchQuery },
          headers: {
            Authorization: `${token}`
          }
        }
      )

      console.log("Building search results:", response.data)
      // Handle the building search results here
    } catch (error) {
      console.error("Error performing building search:", error)
      // Handle the error here
    }
  }

  const handlePersonSearch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/volunteer/personSearch",
        {
          params: { query: personSearchQuery },
          headers: {
            Authorization: `${token}`
          }
        }
      )

      console.log("Person search results:", response.data)
      // Handle the person search results here
    } catch (error) {
      console.error("Error performing person search:", error)
      // Handle the error here
    }
  }

  return (
    <div>
      <div>
        <h2>Building and Address Search</h2>
        <input
          type="text"
          value={buildingSearchQuery}
          onChange={(e) => setBuildingSearchQuery(e.target.value)}
        />
        <button onClick={handleBuildingSearch}>Search</button>
      </div>

      <div>
        <h2>Person Search</h2>
        <input
          type="text"
          value={personSearchQuery}
          onChange={(e) => setPersonSearchQuery(e.target.value)}
        />
        <button onClick={handlePersonSearch}>Search</button>
      </div>
    </div>
  )
}
