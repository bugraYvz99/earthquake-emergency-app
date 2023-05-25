import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getIncidentDataByMarkerId } from "../thunks/getIncidentData"
import { getMarkerByMarkerId } from "../thunks/getMarkerById"

const MarkerDetails = () => {
  const { markerId } = useParams()
  const [incident, setIncident] = useState({})
  const [marker, setMarker] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    // Markerı almak için getMarkerByMarkerId thunk'ını dispatch edin
    getMarkerByMarkerId(markerId)
      .then((marker) => {
        setMarker(marker)
        // İşlemlere devam edebilirsiniz...
      })
      .catch((error) => {
        console.error(error)
        // Hata durumunu ele alabilirsiniz...
      })

    // İlgili olay verilerini almak için getIncidentDataByMarkerId thunk'ını dispatch edin
    dispatch(getIncidentDataByMarkerId(markerId))
      .unwrap()
      .then((data) => {
        setIncident(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [dispatch, markerId])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Marker Details</h1>
      <p className="mb-4">Marker ID: {markerId}</p>
      <p>{marker.rate}</p>

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
