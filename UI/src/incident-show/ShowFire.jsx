import { Divider } from "@mantine/core"
import React from "react"

const ShowFire = ({ incident }) => {
  // Extract the "created_at" time value

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">Yangın Bilgileri</h2>
      <p className="mb-2">
        {incident._doc.details.status &&
          "Yangın durumu: " + incident._doc.details.status}
      </p>
      <Divider label="İnsan Bilgileri" w="100%" c={"blue"} size={"lg"} />
      {incident._doc.details.persons && (
        <p className="mb-2">
          {incident._doc.details.persons.burned &&
            "Yaralanan Kişi Sayısı:" + incident._doc.details.persons.burned}
        </p>
      )}
    </div>
  )
}

export default ShowFire
