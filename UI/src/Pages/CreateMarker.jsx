import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postMarker } from "../thunks/postMarker"
import { Button, Card, Input, Select } from "@mantine/core"
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
    details: {
      personInfos: []
    },
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
  const handleInputChange2 = (e) => {
    const { name, value } = e.target
    const [category, fieldName, personIndex, subFieldName] = name.split(".")

    if (category === "details" && fieldName === "personInfos") {
      const index = parseInt(personIndex, 10)
      setIncidentData((prevState) => {
        const updatedPersonInfos = [...prevState.details.personInfos]
        updatedPersonInfos[index] = {
          ...updatedPersonInfos[index],
          [subFieldName]: value
        }

        return {
          ...prevState,
          details: {
            ...prevState.details,
            personInfos: updatedPersonInfos
          }
        }
      })
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
      case "Deprem":
        return (
          <EarthquakeEvent
            setIncidentData={setIncidentData}
            handleInputChange2={handleInputChange2}
            handleInputChange={handleInputChange}
            incidentData={incidentData}
          />
        )
      case "Yangın":
        return (
          <FireEvent
            setIncidentData={setIncidentData}
            handleInputChange2={handleInputChange2}
            handleInputChange={handleInputChange}
            incidentData={incidentData}
          />
        )
      case "Gaz kaçağı":
        return (
          <GasLeak
            setIncidentData={setIncidentData}
            handleInputChange2={handleInputChange2}
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
      <Card h="100%" className=" pb-32">
        <Select
          className=" "
          pos={"relative"}
          label={"Olay tipi"}
          dropdownPosition="bottom"
          data={[
            { label: "Yangın Bilgisi", value: "Yangın" },
            { label: "Gaz Kaçağı Bilgisi", value: "Gaz kaçağı" },
            { label: "Genel Hasar Bilgisi", value: "Deprem" }
            // Diğer tipleri buraya ekleyebilirsiniz
          ]}
          placeholder="Olay tipi"
          value={incidentData.type}
          onChange={(value) =>
            setIncidentData((prevState) => ({ ...prevState, type: value }))
          }
        />
        {renderEventComponent()}
        <Button
          className="relative top-10"
          variant="outline"
          onClick={handleSubmit}
        >
          Onayla ve haritaya işaretçi oluştur
        </Button>
      </Card>
    </div>
  )
}

export default CreateMarker
