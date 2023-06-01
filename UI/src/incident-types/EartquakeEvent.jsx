import React from "react"
import { Button, Card, Input } from "@mantine/core"

const EarthquakeEvent = ({
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
    <div>
      <Card>
        <h1>Deprem Bilgileri</h1>
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
        {/* Daha fazla input alanını buraya ekleyebilirsiniz */}
      </Card>
      <Card>
        <h1>İnsan bilgileri</h1>
        <Input.Wrapper label="İçeride ki insan sayısı">
          <Input
            type="number"
            name="persons.inside"
            value={incidentData.details.inside}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
        <Input.Wrapper label="Enkaz altında tespit edilen insan sayısı">
          <Input
            type="number"
            name="persons.trapped"
            value={incidentData.details.trapped}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
        <Input.Wrapper label="Enkazdan kurtarılmış insan sayısı">
          <Input
            type="number"
            name="persons.rescued"
            value={incidentData.details.rescued}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
        <Input.Wrapper label="Vefat eden insan sayısı">
          <Input
            type="number"
            name="persons.dead"
            value={incidentData.details.dead}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
        <Input.Wrapper label="Yaralı İnsan sayısı">
          <Input
            type="number"
            name="persons.injured"
            value={incidentData.details.injured}
            onChange={handleInputChange}
          />{" "}
        </Input.Wrapper>{" "}
      </Card>
      {renderPersonInputs()}
      <Button variant="outline" onClick={handleAddPerson}>
        Kişi ekle
      </Button>
    </div>
  )
}

export default EarthquakeEvent
