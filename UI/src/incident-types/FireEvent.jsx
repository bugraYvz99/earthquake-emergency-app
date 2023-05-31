import React from "react"
import { Button, Card, Input } from "@mantine/core"

const FireEvent = ({
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
          { name: "", surname: "", tcNo: "" }
        ]
      }
    }))
  }

  return (
    <Card>
      <h1>Yangın Bilgileri</h1>
      <Input.Wrapper label="Yangın Durumu">
        <Input
          type="text"
          name="details.fireStuation"
          value={incidentData.details.fireStuation}
          onChange={handleInputChange}
        />
      </Input.Wrapper>
      <Input.Wrapper label="Yanan Kişi Sayısı">
        <Input
          type="text"
          name="persons.burned"
          value={incidentData.details.burned}
          onChange={handleInputChange}
        />
      </Input.Wrapper>
      {renderPersonInputs()}
      <Button variant="outline" onClick={handleAddPerson}>
        Add Person
      </Button>
    </Card>
  )
}

export default FireEvent
