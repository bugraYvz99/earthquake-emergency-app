import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { postIncident } from "../thunks/postIncident"
import { Card, Input, Select } from "@mantine/core"
import EarthquakeEvent from "../incident-types/EartquakeEvent"
import FireEvent from "../incident-types/FireEvent"
import GasLeak from "../incident-types/GasLeak"

export const CreateIncident = () => {
  const { markerId } = useParams()
  console.log(markerId)
  const [incidentData, setIncidentData] = useState({
    type: "",
    details: {},
    media: []
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    const [category, fieldName] = name.split(".")

    if (category === "details") {
      setIncidentData((prevState) => ({
        ...prevState,
        details: {
          ...prevState.details,
          [fieldName]: value
        }
      }))
    } else if (category === "persons") {
      // Updated condition for "persons" category
      setIncidentData((prevState) => ({
        ...prevState,
        details: {
          // Updated to store "persons" data within "details"
          ...prevState.details,
          persons: {
            ...prevState.details.persons,
            [fieldName]: value
          }
        }
      }))
    } else {
      setIncidentData((prevState) => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(incidentData)
      await postIncident(markerId, incidentData)
      console.log("başarılı")
      // Handle success, such as showing a success message or redirecting to a different page
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error(error)
    }
    // Reset the form or perform any other necessary actions
  }
  const renderEventComponent = () => {
    const { type } = incidentData

    switch (type) {
      case "earthquake":
        return (
          <EarthquakeEvent
            handleInputChange={handleInputChange}
            incidentData={incidentData}
          />
        )
      case "fire":
        return (
          <FireEvent
            handleInputChange={handleInputChange}
            incidentData={incidentData}
          />
        )
      case "gas_leak":
        return (
          <GasLeak
            handleInputChange={handleInputChange}
            incidentData={incidentData}
          />
        )
      default:
        return null
    }
  }
  return (
    <div className="grid gap-4">
      {/* Input fields for incident data */}
      <Card h={1000} className=" ">
        <Select
          className=" "
          pos={"relative"}
          label={"Olay tipi"}
          dropdownPosition="bottom"
          defaultValue={"earthquake"}
          data={[
            { label: "Yangın Bilgisi", value: "fire" },
            { label: "Gaz Kaçağı Bilgisi", value: "gas_leak" },
            { label: "Genel Hasar Bilgisi", value: "earthquake" }
            // Diğer tipleri buraya ekleyebilirsiniz
          ]}
          placeholder="Olay tipi"
          value={incidentData.type}
          onChange={(value) =>
            setIncidentData((prevState) => ({ ...prevState, type: value }))
          }
        />
        {renderEventComponent()}
      </Card>

      <button onClick={handleSubmit}>Create Marker</button>
    </div>
  )
}
