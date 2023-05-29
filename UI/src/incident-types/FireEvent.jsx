import React from "react"
import { Card, Input } from "@mantine/core"

const FireEvent = ({ handleInputChange, incidentData }) => {
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
      {/* Daha fazla input alanını buraya ekleyebilirsiniz */}
    </Card>
  )
}

export default FireEvent
