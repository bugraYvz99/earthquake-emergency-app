import React from "react"
import { Button, Card, Input, Select } from "@mantine/core"

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
  const handleSelectChange = (selectedOption, name) => {
    setIncidentData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        [name]: selectedOption
      }
    }))
  }

  return (
    <Card h={"100%"}>
      <h1>Yangın Bilgileri</h1>
      <Input.Wrapper label="Yangın Durumu">
        <Select
          className=" overflow-auto"
          name="details.fireStuation"
          value={incidentData.details.fireStuation}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, "status")
          }
          data={[
            { value: "Hasar yok", label: "Hasar yok" },
            { value: "Az hasarlı", label: "Az hasarlı" },
            { value: "Orta hasarlı", label: "Orta hasarlı" },
            { value: "Çok hasarlı", label: "Çok hasarlı" }
          ]}
        ></Select>
      </Input.Wrapper>
      <Input.Wrapper label="Yaralanan Kişi Sayısı">
        <Input
          type="text"
          name="persons.burned"
          value={incidentData.details.burned}
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

export default FireEvent
