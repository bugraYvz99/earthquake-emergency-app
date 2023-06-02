import React from "react"
import { Button, Card, Input, Select } from "@mantine/core"

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
    console.log(selectedOption)
    setIncidentData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        [name]: selectedOption
      }
    }))
  }
  const options = [
    { value: "iyi", label: "İyi" },
    { value: "kötü", label: "Kötü" },
    { value: "çok kötü", label: "Çok Kötü" }
  ]
  return (
    <div>
      <Card>
        <h1>Deprem Bilgileri</h1>

        <Input.Wrapper label="Binanın durumu">
          <Select
            name="details.status"
            value={incidentData.details.status}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "status")
            }
            data={[
              { value: "Hasar yok", label: "Hasar yok" },
              { value: "Az hasarlı", label: "Az hasarlı" },
              { value: "Orta hasarlı", label: "Orta hasarlı" },
              { value: "Çok hasarlı", label: "Çok hasarlı" },
              { value: "Yıkıldı", label: "Yıkıldı" }
            ]}
          ></Select>
        </Input.Wrapper>

        <Input.Wrapper label="Çatı durumu">
          <Select
            name="details.roof"
            value={incidentData.details.roof}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "roof")
            }
            data={options}
          ></Select>
        </Input.Wrapper>

        <Input.Wrapper label="Zemin durumu">
          <Select
            name="details.floor"
            value={incidentData.details.floor}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "floor")
            }
            data={options}
          ></Select>
        </Input.Wrapper>

        <Input.Wrapper label="Merdiven durumu">
          <Select
            name="details.stairs"
            value={incidentData.details.stairs}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "stairs")
            }
            data={options}
          ></Select>
        </Input.Wrapper>

        <Input.Wrapper label="Asansör durumu">
          <Select
            name="details.elevator"
            value={incidentData.details.elevator}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "elevator")
            }
            data={options}
          ></Select>
        </Input.Wrapper>

        <Input.Wrapper label="Duvar durumu">
          <Select
            name="details.wall"
            value={incidentData.details.wall}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "wall")
            }
            data={options}
          ></Select>
        </Input.Wrapper>

        <Input.Wrapper label="Kolon durumu">
          <Select
            name="details.column"
            value={incidentData.details.column}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "column")
            }
            data={options}
          ></Select>
        </Input.Wrapper>
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
