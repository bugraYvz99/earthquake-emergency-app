import React from "react"

const ShowFire = ({ incident }) => {
  return (
    <div>
      <h1>Yangın Bilgileri</h1>
      <p className="mb-2">
        {incident._doc.details.fireStuation &&
          "Yangın durumu: " + incident._doc.details.fireStuation}
      </p>
      {incident._doc.details.persons && (
        <p className="mb-2">
          {incident._doc.details.fireStuation &&
            "Yanan Kişi Sayısı:" + incident._doc.details.persons.burned}
        </p>
      )}
    </div>
  )
}

export default ShowFire
