import { Card, Text } from "@mantine/core"
import React from "react"
import { Link } from "react-router-dom"

const ShowEarthquake = ({ incident }) => {
  const { details } = incident._doc

  return (
    <div>
      <h1>Deprem Bilgileri</h1>
      <Card>
        {details.column && <p className="mb-2">Column: {details.column}</p>}
        {details.elevator && (
          <p className="mb-2">Elevator: {details.elevator}</p>
        )}
        {details.floor && <p className="mb-2">Floor: {details.floor}</p>}
        {details.roof && <p className="mb-2">Roof: {details.roof}</p>}
        {details.stairs && <p className="mb-2">Stairs: {details.stairs}</p>}
        {details.status && <p className="mb-2">Status: {details.status}</p>}
        {details.wall && <p className="mb-2">Wall: {details.wall}</p>}
      </Card>
      {details.persons && (
        <Card>
          <h2>İnsan bilgileri</h2>
          <ul className="list-disc list-inside">
            {details.persons.dead && <li>Dead: {details.persons.dead}</li>}
            {details.persons.injured && (
              <li>Injured: {details.persons.injured}</li>
            )}
            {details.persons.inside && (
              <li>Inside: {details.persons.inside}</li>
            )}
            {details.persons.rescued && (
              <li>Rescued: {details.persons.rescued}</li>
            )}
            {details.persons.trapped && (
              <li>Trapped: {details.persons.trapped}</li>
            )}
          </ul>
        </Card>
      )}
    </div>
  )
}

export default ShowEarthquake
