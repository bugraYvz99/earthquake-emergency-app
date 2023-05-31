import React from "react"

const ShowGasLeak = ({ incident }) => {
  return (
    <div>
      <h1>Gaz Kaçağı Bilgileri</h1>
      <p className="mb-2">Gas Durumu: {incident._doc.details.gasStuation}</p>
      <p className="mb-2">
        Zehirlenen kişi sayısı: {incident._doc.details.persons.poisoned}
      </p>
    </div>
  )
}

export default ShowGasLeak
