import { Divider } from "@mantine/core"
import React from "react"

const ShowFire = ({ incident }) => {
  // Extract the "created_at" time value
  const createdAt = new Date(incident._doc.created_at)

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">Yangın Bilgileri</h2>
      <p className="mb-2">
        {incident._doc.details.status &&
          "Yangın durumu: " + incident._doc.details.status}
      </p>
      {incident._doc.details.persons && (
        <div>
          <Divider label="İnsan Bilgileri" w="100%" c={"blue"} size={"lg"} />
          <p className="mb-2">
            {"Yaralanan Kişi Sayısı: " + incident._doc.details.persons.burned}
          </p>
        </div>
      )}
    </div>
  )
}

export default ShowFire
