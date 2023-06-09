import { Card, Divider, Text } from "@mantine/core"
import React from "react"
import { Link } from "react-router-dom"

const ShowEarthquake = ({ incident }) => {
  const { details } = incident._doc

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">Deprem Bilgileri</h2>
      <div className>
        {details.column && <p className="mb-2">Sütun: {details.column}</p>}
        {details.elevator && (
          <p className="mb-2">Asansör: {details.elevator}</p>
        )}
        {details.floor && <p className="mb-2">Kat: {details.floor}</p>}
        {details.roof && <p className="mb-2">Çatı: {details.roof}</p>}
        {details.stairs && <p className="mb-2">Merdiven: {details.stairs}</p>}
        {details.status && <p className="mb-2">Durum: {details.status}</p>}
        {details.wall && <p className="mb-2">Duvar: {details.wall}</p>}
      </div>
      <Divider label="İnsan Bilgileri" w="100%" c={"blue"} size={"lg"} />
      {details.persons && (
        <div>
          <ul className="list-disc list-inside">
            {details.persons.dead && <li>Ölü: {details.persons.dead}</li>}
            {details.persons.injured && (
              <li>Yaralı: {details.persons.injured}</li>
            )}
            {details.persons.inside && (
              <li>İçeride: {details.persons.inside}</li>
            )}
            {details.persons.rescued && (
              <li>Kurtarıldı: {details.persons.rescued}</li>
            )}
            {details.persons.trapped && (
              <li>Mahsur: {details.persons.trapped}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
export default ShowEarthquake
