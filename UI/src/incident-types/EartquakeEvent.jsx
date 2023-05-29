import React from "react"
import { Card, Input } from "@mantine/core"

const EarthquakeEvent = ({ handleInputChange, incidentData }) => {
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
    </div>
  )
}

export default EarthquakeEvent
