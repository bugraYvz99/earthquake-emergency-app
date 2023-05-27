import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getIncidentDataByMarkerId } from "../thunks/getIncidentData"
import { getMarkerByMarkerId } from "../thunks/getMarkerById"

const MarkerDetails = () => {
  const navigate = useNavigate()
  const { markerId } = useParams()
  const [incident, setIncident] = useState([])
  const [marker, setMarker] = useState({})
  const dispatch = useDispatch()
  console.log(incident)

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
        setIncident(data.incidents)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [dispatch, markerId])
  const handleCreateIncident = () => {
    navigate(`/create-incident/${markerId}`)
  }
  return (
    <div>
      {Array.isArray(incident) && incident.length > 0 ? (
        incident.map((item) => (
          <div key={item._id} className="bg-white rounded shadow p-4">
            <h2 className="text-2xl font-bold mb-2">Incident Details:</h2>
            <h3 className="text-2xl font-bold mb-2">
              {"Oluşturan kullanıcı:" + item.userName}
            </h3>
            <p className="mb-2">Type: {item.type}</p>
            {item.details && (
              <>
                <p className="mb-2">Column: {item.details.column}</p>
                <p className="mb-2">Elevator: {item.details.elevator}</p>
                <p className="mb-2">Floor: {item.details.floor}</p>
                <p className="mb-2">Roof: {item.details.roof}</p>
                <p className="mb-2">Stairs: {item.details.stairs}</p>
                <p className="mb-2">Status: {item.details.status}</p>
                <p className="mb-2">Wall: {item.details.wall}</p>
              </>
            )}
            {item.persons && (
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Persons:</h3>
                <ul className="list-disc list-inside">
                  <li>Dead: {item.persons.dead}</li>
                  <li>Injured: {item.persons.injured}</li>
                  <li>Inside: {item.persons.inside}</li>
                  <li>Rescued: {item.persons.rescued}</li>
                  <li>Trapped: {item.persons.trapped}</li>
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No incident data available.</p>
      )}
      <button onClick={handleCreateIncident}>Bilgi ekle</button>
    </div>
  )
}

export default MarkerDetails
