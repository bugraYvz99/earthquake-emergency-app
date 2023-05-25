import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postMarker } from "../thunks/postMarker"
import { Card, Input } from "@mantine/core"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

const CreateMarker = () => {
  const navigate = useNavigate()
  const { lat, lng } = useParams()
  const dispatch = useDispatch()
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
      inside: 0,
      trapped: 0,
      rescued: 0,
      dead: 0,
      injured: 0,
      identities: []
    }
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
      setIncidentData((prevState) => ({
        ...prevState,
        persons: {
          ...prevState.persons,
          [fieldName]: value
        }
      }))
    } else {
      setIncidentData((prevState) => ({
        ...prevState,
        [name]: value
      }))
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
      <Card>
        <h1>Bina bilgileri</h1>
        <Input.Wrapper label="Olay tipi">
          <Input
            type="text"
            name="type"
            value={incidentData.type}
            onChange={handleInputChange}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Binanın durumu">
          <Input
            type="text"
            name="details.status"
            value={incidentData.details.status}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
        <Input.Wrapper label="Çatı hasarı">
          <Input
            type="text"
            name="details.roof"
            value={incidentData.details.roof}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
        <Input.Wrapper label="Zemin hasarı">
          <Input
            type="text"
            name="details.floor"
            value={incidentData.details.floor}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
        <Input.Wrapper label="Merdiven hasarı">
          <Input
            type="text"
            name="details.stairs"
            value={incidentData.details.stairs}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
        <Input.Wrapper label="Asansör durumu">
          <Input
            type="text"
            name="details.elevator"
            value={incidentData.details.elevator}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
        <Input.Wrapper label="Duvar hasarı">
          <Input
            type="text"
            name="details.wall"
            value={incidentData.details.wall}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
        <Input.Wrapper label="Kolon hasarı">
          <Input
            type="text"
            name="details.column"
            value={incidentData.details.column}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
      </Card>
      <Card>
        <h1>İnsan bilgileri</h1>
        <Input.Wrapper label="İçeride ki insan sayısı">
          <Input
            type="number"
            name="persons.inside"
            value={incidentData.persons.inside}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
        <Input.Wrapper label="Enkaz altında tespit edilen insan sayısı">
          <Input
            type="number"
            name="persons.trapped"
            value={incidentData.persons.trapped}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
        <Input.Wrapper label="Enkazdan kurtarılmış insan sayısı">
          <Input
            type="number"
            name="persons.rescued"
            value={incidentData.persons.rescued}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
        <Input.Wrapper label="Vefat eden insan sayısı">
          <Input
            type="number"
            name="persons.dead"
            value={incidentData.persons.dead}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
        <Input.Wrapper label="Yaralı İnsan sayısı">
          <Input
            type="number"
            name="persons.injured"
            value={incidentData.persons.injured}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
      </Card>
      <Input.Wrapper>
        <Input
          type="text"
          name="persons.identities"
          value={incidentData.persons.identities}
          onChange={handleInputChange}
        />
      </Input.Wrapper>
      <button onClick={handleSubmit}>Create Marker</button>
    </div>
  )
}

export default CreateMarker
