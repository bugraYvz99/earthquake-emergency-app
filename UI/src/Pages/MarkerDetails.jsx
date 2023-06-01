import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getIncidentDataByMarkerId } from "../thunks/getIncidentData"
import { getMarkerByMarkerId } from "../thunks/getMarkerById"
import { deleteIncident } from "../thunks/deleteIncident"

import ShowEarthquake from "../incident-show/ShowEarthquake"

import ShowGasLeak from "../incident-show/ShowGasLeak"
import ShowFire from "../incident-show/ShowFire"
import { Button } from "@mantine/core"
import MarkerDetailMap from "../components/MarkerDetailMap"

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
      case "Gaz kaçağı":
        return <ShowGasLeak incident={incident} />
      case "Yangın":
        return <ShowFire incident={incident} />
      case "Deprem":
        return <ShowEarthquake incident={incident} />
      default:
        return null
    }
  }

  return (
    <div>
      {marker && <MarkerDetailMap markerData={marker} />}
      {Array.isArray(incident) && incident.length > 0 ? (
        incident.map((item) => (
          <div
            key={item._doc._id}
            className={`grid grid-flow-row grid-cols-2 mx-2 mt-4 ${
              item.isOwner
                ? ownerBackgroundClass
                : "bg-white rounded shadow p-4"
            }`}
          >
            {renderIncidentComponent(item._doc.type, item)}
            <p>{marker.address}</p>
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
      <Button variant="filled" onClick={handleCreateIncident}>
        Bilgi ekle
      </Button>
    </div>
  )
}

export default MarkerDetails
