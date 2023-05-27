import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { postIncident } from "../thunks/postIncident"

export const CreateIncident = () => {
  const { markerId } = useParams()
  console.log(markerId)
  const [incidentData, setIncidentData] = useState({
    type: "",
    details: {
      status: "",
      roof: "",
      floor: "",
      stairs: "",
      elevator: "",
      wall: "",
      column: ""
    },
    media: [],
    persons: {
      inside: "",
      trapped: "",
      rescued: "",
      dead: "",
      injured: ""
    }
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setIncidentData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  const handleDetailsChange = (e) => {
    const { name, value } = e.target
    setIncidentData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        [name]: value
      }
    }))
  }

  const handlePersonsChange = (e) => {
    const { name, value } = e.target
    setIncidentData((prevData) => ({
      ...prevData,
      persons: {
        ...prevData.persons,
        [name]: value
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await postIncident(markerId, incidentData)
      console.log("başarılı")
      // Handle success, such as showing a success message or redirecting to a different page
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error(error)
    }
    // Reset the form or perform any other necessary actions
  }

  return (
    <div>
      <h2>Create Incident</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={incidentData.type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Details:</label>
          <input
            type="text"
            name="status"
            value={incidentData.details.status}
            onChange={handleDetailsChange}
          />
          <input
            type="text"
            name="roof"
            value={incidentData.details.roof}
            onChange={handleDetailsChange}
          />
          <input
            type="text"
            name="floor"
            value={incidentData.details.floor}
            onChange={handleDetailsChange}
          />
          <input
            type="text"
            name="stairs"
            value={incidentData.details.stairs}
            onChange={handleDetailsChange}
          />
          <input
            type="text"
            name="elevator"
            value={incidentData.details.elevator}
            onChange={handleDetailsChange}
          />
          <input
            type="text"
            name="wall"
            value={incidentData.details.wall}
            onChange={handleDetailsChange}
          />
          <input
            type="text"
            name="column"
            value={incidentData.details.column}
            onChange={handleDetailsChange}
          />
        </div>
        <div>
          <label>Persons:</label>
          <input
            type="text"
            name="inside"
            value={incidentData.persons.inside}
            onChange={handlePersonsChange}
          />
          <input
            type="text"
            name="trapped"
            value={incidentData.persons.trapped}
            onChange={handlePersonsChange}
          />
          <input
            type="text"
            name="rescued"
            value={incidentData.persons.rescued}
            onChange={handlePersonsChange}
          />
          <input
            type="text"
            name="dead"
            value={incidentData.persons.dead}
            onChange={handlePersonsChange}
          />
          <input
            type="text"
            name="injured"
            value={incidentData.persons.injured}
            onChange={handlePersonsChange}
          />
        </div>
        <button type="submit">Create Incident</button>
      </form>
    </div>
  )
}
