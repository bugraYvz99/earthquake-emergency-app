import { useSelector, useDispatch } from "react-redux"
import { selectMarker } from "../Store/mapSlice"
import { Table } from "@mantine/core"
import { fetchMarkers } from "../thunks/getmarkers"
import { useEffect, useState } from "react"

const DataShowPage = () => {
  const [dbMarkers, setDbMarkers] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchMarkers())
      .unwrap()
      .then((markers) => {
        setDbMarkers(markers)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [dispatch])
  const handleMarkerClick = (marker) => {
    dispatch(selectMarker(marker))
    // Burada seçilen markerın yol tarifi gösterme işlemlerini yapabilirsiniz
  }
  console.log(dbMarkers)
  const rows = dbMarkers.map((marker, index) => (
    <tr className="" key={index} onClick={() => handleMarkerClick(marker)}>
      <td>{marker.address}</td>
      <td>
        {marker.ratings.length > 0
          ? (
              marker.ratings.reduce((a, b) => a + b) / marker.ratings.length
            ).toFixed(2)
          : 0}
      </td>
    </tr>
  ))

  return (
    <div>
      <Table>
        <thead>
          <tr className="">
            <td className="">Adres</td>
            <td className="">Puan</td>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  )
}

export default DataShowPage
