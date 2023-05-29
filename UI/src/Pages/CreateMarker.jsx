import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postMarker } from "../thunks/postMarker"
import { Card, Input, Select } from "@mantine/core"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import EarthquakeEvent from "../incident-types/EartquakeEvent"
import FireEvent from "../incident-types/FireEvent"
import GasLeak from "../incident-types/GasLeak"

const CreateMarker = () => {
  const navigate = useNavigate()
  const { lat, lng } = useParams()
  const dispatch = useDispatch()
  const [incidentData, setIncidentData] = useState({
    type: "",
    details: {},
    media: []
  })
  const [address, setAddress] = useState("")

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDXUM99i5wpXdDa8fqqW18TtwHKrQYimyE`
        )
        const results = response.data.results
        if (results.length > 0) {
          setAddress(results[0].formatted_address)
        }
      } catch (error) {
        console.log("Error retrieving address:", error)
      }
    }

    getAddress()
  }, [lat, lng])

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
  const user = useSelector((state) => state.user)
  const userNumber = user.tokenData.phoneNumber
  const userName = user.tokenData.name
  const handleSubmit = () => {
    const markerData = {
      userNumber: userNumber,
      userName: userName,
      position: {
        lat: lat,
        lng: lng
      },
      address: address
    }
    dispatch(postMarker({ markerData, incidentData }))
    window.location.href = "/page1"
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

export default CreateMarker
