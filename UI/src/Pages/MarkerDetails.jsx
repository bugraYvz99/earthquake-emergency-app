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
  const ownerBackgroundClass = 'bg-blue-200';

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
 
  const handleTextChange = (event, incidentId) => {
    const { value } = event.target;
    setIncident((prevIncident) =>
      prevIncident.map((item) =>
        item._id === incidentId ? { ...item, text: value } : item
      )
    );
  };
  const handleUpdateIncident = (incidentId) => {
    // Implement the logic to update the incident with the modified text
    // You can make an API call or dispatch a Redux action here
    console.log("Update incident:", incidentId);
  };
  return (
    <div>
      {Array.isArray(incident) && incident.length > 0 ? (
        incident.map((item) => (
          <div key={item._id} className={`bg-white rounded shadow p-4 ${item.isOwner ? ownerBackgroundClass : ''}`}
          >
            <h2 className="text-2xl font-bold mb-2">Incident Details:</h2>
            <h3 className="text-2xl font-bold mb-2">
              {"Oluşturan kullanıcı:" + item._doc.userName}
            </h3>
            <p className="mb-2">Type: {item._doc.type}</p>
            {item._doc.details && (
              <>
                <p className="mb-2">Column: {item._doc.details.column}</p>
                <p className="mb-2">Elevator: {item._doc.details.elevator}</p>
                <p className="mb-2">Floor: {item._doc.details.floor}</p>
                <p className="mb-2">Roof: {item._doc.details.roof}</p>
                <p className="mb-2">Stairs: {item._doc.details.stairs}</p>
                <p className="mb-2">Status: {item._doc.details.status}</p>
                <p className="mb-2">Wall: {item._doc.details.wall}</p>
              </>
            )}
            {item._doc.persons && (
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Persons:</h3>
                <ul className="list-disc list-inside">
                  <li>Dead: {item._doc.persons.dead}</li>
                  <li>Injured: {item._doc.persons.injured}</li>
                  <li>Inside: {item._doc.persons.inside}</li>
                  <li>Rescued: {item._doc.persons.rescued}</li>
                  <li>Trapped: {item._doc.persons.trapped}</li>
                </ul>
              </div>
            )}
             {item.isOwner ? (
              <>
                {item.isEditing ? (
                  <>
                    <textarea
                      className="mb-2"
                      rows="3"
                      value={item.text}
                      onChange={(event) => handleTextChange(event, item._id)}
                    />
                    <button
                      onClick={() => handleUpdateIncident(item._doc._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Update
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      setIncident((prevIncident) =>
                        prevIncident.map((prevItem) =>
                          prevItem._id === item._id
                            ? { ...prevItem, isEditing: true }
                            : { ...prevItem, isEditing: false }
                        )
                      )
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                )}
              </>
            ) : null}
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
