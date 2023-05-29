import React from "react"
import { Card, Input } from "@mantine/core"

const GasLeak = ({ handleInputChange, incidentData }) => {
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
      {/* Daha fazla input alanını buraya ekleyebilirsiniz */}
    </Card>
  )
}

export default GasLeak
