import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getIncidentDataByMarkerId } from "../thunks/getIncidentData"
import { getMarkerByMarkerId } from "../thunks/getMarkerById"
import { deleteIncident } from "../thunks/deleteIncident"

import ShowEarthquake from "../incident-show/ShowEarthquake"

import ShowGasLeak from "../incident-show/ShowGasLeak"
import ShowFire from "../incident-show/ShowFire"

const MarkerDetails = () => {
  const navigate = useNavigate()
  const { markerId } = useParams()
  const [incident, setIncident] = useState([])
  const [marker, setMarker] = useState({})
  const dispatch = useDispatch()
  const ownerBackgroundClass = "bg-blue-200"

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

  const handleDeleteIncident = (incidentId) => {
    deleteIncident(incidentId)
      .then((data) => {
        console.log("Incident deleted successfully")
        console.log(data)
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error deleting incident:", error)
      })
    console.log("Delete incident:", incidentId)
  }

  const renderIncidentComponent = (incidentType, incident) => {
    switch (incidentType) {
      case "gas_leak":
        return <ShowGasLeak incident={incident} />
      case "fire":
        return <ShowFire incident={incident} />
      case "earthquake":
        return <ShowEarthquake incident={incident} />
      default:
        return null
    }
  }

  return (
    <div>
      {Array.isArray(incident) && incident.length > 0 ? (
        incident.map((item) => (
          <div
            key={item._doc._id}
            className={` ${
              item.isOwner
                ? ownerBackgroundClass
                : "bg-white rounded shadow p-4"
            }`}
          >
            <h2 className="text-2xl font-bold mb-2">Olay bilgileri</h2>
            <h3 className="text-2xl font-bold mb-2">
              {"Oluşturan kullanıcı:" + item._doc.userName}
            </h3>
            <p className="mb-2">Type: {item._doc.type}</p>
            {renderIncidentComponent(item._doc.type, item)}
            {item.isOwner && (
              <div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteIncident(item._doc._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded ml-3"
                >
                  Delete
                </button>
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
