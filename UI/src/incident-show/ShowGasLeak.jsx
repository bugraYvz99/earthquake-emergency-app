import { Divider, Text } from "@mantine/core"
import React from "react"

const ShowGasLeak = ({ incident }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-5">Gaz Kaçağı Bilgileri</h2>
      <Text className="mb-2">
        Gas Durumu: {incident._doc.details.gasStatus}
      </Text>
      {incident._doc.details.persons?.poisoned && (
        <div>
          <Divider label="İnsan Bilgileri" w="100%" c={"blue"} size={"lg"} />
          <Text className="mb-2">
            Zehirlenen kişi sayısı: {incident._doc.details.persons.poisoned}
          </Text>
          <Text className="mb-2">
            Yaralanan kişi sayısı: {incident._doc.details.persons.injured}
          </Text>
        </div>
      )}
    </div>
  )
}

export default ShowGasLeak
