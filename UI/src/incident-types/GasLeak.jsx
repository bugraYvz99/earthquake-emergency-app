import React from "react"
import { Button, Card, Input } from "@mantine/core"

const GasLeak = ({
  handleInputChange2,
  handleInputChange,
  incidentData,
  setIncidentData
}) => {
  const renderPersonInputs = () => {
    if (incidentData.details.personInfos.length === 0) {
      return null
    }
    return incidentData.details.personInfos.map((person, index) => (
      <div className=" mt-4" key={index}>
        <Input
          name={`details.personInfos.${index}.name`}
          value={person.name}
          onChange={handleInputChange2}
          placeholder="Name"
        />
        <Input
          name={`details.personInfos.${index}.surname`}
          value={person.surname}
          onChange={handleInputChange2}
          placeholder="Surname"
        />
        <Input
          name={`details.personInfos.${index}.tcNo`}
          value={person.tcNo}
          onChange={handleInputChange2}
          placeholder="TC No"
        />
        <Input
          name={`details.personInfos.${index}.health`}
          value={person.health}
          onChange={handleInputChange2}
          placeholder="Sağlık Durumu"
        />
      </div>
    ))
  }
  const handleAddPerson = () => {
    setIncidentData((prevState) => ({
      ...prevState,
      details: {
        ...prevState.details,
        personInfos: [
          ...prevState.details.personInfos,
          { name: "", surname: "", tcNo: "", health: "" }
        ]
      }
    }))
  }
  return (
    <Card>
      <h1>Gaz Kaçağı Bilgileri</h1>
      <Input.Wrapper
        label="
      Gaz Durumu"
      >
        <Input
          type="text"
          name="details.gasStuation"
          value={incidentData.details.gasStuation}
          onChange={handleInputChange}
        />
      </Input.Wrapper>
      <Input.Wrapper label="Zehirlenen Kişi Sayısı">
        <Input
          type="text"
          name="persons.poisoned"
          value={incidentData.details.poisoned}
          onChange={handleInputChange}
        />
      </Input.Wrapper>
      {renderPersonInputs()}
      <Button variant="outline" onClick={handleAddPerson}>
        Kişi ekle
      </Button>
    </Card>
  )
}

export default GasLeak
