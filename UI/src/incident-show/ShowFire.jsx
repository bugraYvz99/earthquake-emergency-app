import React from "react"

const ShowFire = ({ incident }) => {
  return (
    <div>
      <p className="mb-2">
        Yangın durumu: {incident._doc.details.fireStuation}
      </p>
      {incident._doc.details.persons && (
        <p className="mb-2">
          Yanan Kişi Sayısı: {incident._doc.details.persons.burned}
        </p>
      )}
    </div>
  )
}

export default ShowFire
