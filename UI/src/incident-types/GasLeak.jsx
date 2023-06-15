import React from "react"
import { Button, Card, Input, Select } from "@mantine/core"
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
      <div className="flex flex-col gap-2 mt-4" key={index}>
        <h1>Kişi {index + 1}</h1>
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
        <Input.Wrapper required>
          <Input
            required
            name={`details.personInfos.${index}.tcNo`}
            value={person.tcNo}
            onChange={handleInputChange2}
            placeholder="TC No"
          />
        </Input.Wrapper>
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
  const handleDeletePerson = (index) => {
    setIncidentData((prevState) => {
      const updatedPersonInfos = [...prevState.details.personInfos]
      updatedPersonInfos.splice(index, 1)

      return {
        ...prevState,
        details: {
          ...prevState.details,
          personInfos: updatedPersonInfos
        }
      }
    })
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
    <Card>
      <h1>Gaz Kaçağı Bilgileri</h1>
      <Input.Wrapper
        label="
      Gaz Durumu"
      >
        <Select
          type="text"
          name="details.gasStuation"
          value={incidentData.details.gasStuation}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, "gasStatus")
          }
          data={[
            { value: "Gaz kaçağı riski", label: "Gaz kaçağı riski" },
            { value: "Gaz kaçağı var", label: "Gaz kaçağı var" },
            {
              value: "Yüksek miktarda tüpgaz ve gaz kaçağı var",
              label: "Yüksek miktarda tüpgaz ve gaz kaçağı var"
            },
            {
              value: "Gaz kaçağı patlaması yaşandı",
              label: "Gaz kaçağı patlaması yaşandı"
            }
          ]}
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
      <Input.Wrapper label="Yaralanan Kişi Sayısı">
        <Input
          type="text"
          name="persons.injured"
          value={incidentData.details.injured}
          onChange={handleInputChange}
        />
      </Input.Wrapper>
      {renderPersonInputs()}
      <div className="my-5">
        <Button className="mx-2" variant="outline" onClick={handleAddPerson}>
          Kişi ekle
        </Button>
        <Button
          className="mx-2"
          variant="outline"
          onClick={(index) => handleDeletePerson(index)}
        >
          Delete Person
        </Button>
      </div>
    </Card>
  )
}

export default GasLeak
