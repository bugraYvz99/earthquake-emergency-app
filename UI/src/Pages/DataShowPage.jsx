import { useSelector, useDispatch } from "react-redux"
import { selectMarker } from "../Store/mapSlice"
import { Table, Loader, Card } from "@mantine/core"
import { fetchMarkers } from "../thunks/getmarkers"
import { useEffect, useState } from "react"
import React from "react"
import { useMediaQuery } from "@mantine/hooks"

const DataShowPage = () => {
  const [dbMarkers, setDbMarkers] = useState([])
  const [isLoading, setIsLoading] = useState(true) // State to track loading status
  const dispatch = useDispatch()
  const isDesktop = useMediaQuery("(min-width: 750px)")

  useEffect(() => {
    dispatch(fetchMarkers())
      .unwrap()
      .then((markers) => {
        setDbMarkers(markers)
        setIsLoading(false) // Set loading state to false after markers are fetched
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false) // Set loading state to false in case of error
      })
  }, [dispatch])

  const handleMarkerClick = (marker) => {
    dispatch(selectMarker(marker))
    // Burada seçilen markerın yol tarifi gösterme işlemlerini yapabilirsiniz
  }

  const rows = dbMarkers.map((marker, index) => (
    <Card
      className=""
      mt={10}
      bg={"cyan"}
      shadow="sm"
      radius="md"
      withBorder
      w={isDesktop ? "75%" : "95%"}
      key={index}
    >
      <td className=" border-b-2">Adres</td>
      <td className=" border-b-2 ">Puan</td>
      <tr className="" onClick={() => handleMarkerClick(marker)}>
        <td>{marker.address}</td>
        <td>
          <p>
            {" 5/"}
            {marker.ratings.length > 0
              ? (
                  marker.ratings.reduce((a, b) => a + b) / marker.ratings.length
                ).toFixed(2)
              : 0}
          </p>
        </td>
      </tr>
    </Card>
  ))

  return (
    <div className="flex justify-center items-center content-center place-items-center">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <Loader />
        </div>
      ) : (
        <Table
          className="flex justify-center justify-items-center items-center"
          w={"100%"}
        >
          <Card
            className="flex justify-center justify-items-center items-center"
            mt={10}
            shadow="sm"
            radius="md"
            withBorder
            w={"100%"}
          >
            <thead className=""></thead>

            <tbody className="flex flex-col justify-center justify-items-center items-center mt-4">
              {rows}
            </tbody>
          </Card>
        </Table>
      )}
    </div>
  )
}

export default DataShowPage
