import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getIncidentDataByMarkerId } from "../thunks/getIncidentData"

const MarkerDetails = () => {
  const { markerId } = useParams()
  const [incident, setIncident] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIncidentDataByMarkerId(markerId))
      .unwrap()
      .then((data) => {
        setIncident(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [dispatch])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Marker Details</h1>
      <p className="mb-4">Marker ID: {markerId}</p>

      {incident && Object.keys(incident).length > 0 ? (
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-2xl font-bold mb-2">Incident Details:</h2>
          <p className="mb-2">Type: {incident.type}</p>
          {incident.details && (
            <>
              <p className="mb-2">Column: {incident.details.column}</p>
              <p className="mb-2">Elevator: {incident.details.elevator}</p>
              <p className="mb-2">Floor: {incident.details.floor}</p>
              <p className="mb-2">Roof: {incident.details.roof}</p>
              <p className="mb-2">Stairs: {incident.details.stairs}</p>
              <p className="mb-2">Status: {incident.details.status}</p>
              <p className="mb-2">Wall: {incident.details.wall}</p>
            </>
          )}
          {incident.persons && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Persons:</h3>
              <ul className="list-disc list-inside">
                <li>Dead: {incident.persons.dead}</li>
                <li>Injured: {incident.persons.injured}</li>
                <li>Inside: {incident.persons.inside}</li>
                <li>Rescued: {incident.persons.rescued}</li>
                <li>Trapped: {incident.persons.trapped}</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>No incident data available.</p>
      )}
    </div>
  )
}

export default MarkerDetails
