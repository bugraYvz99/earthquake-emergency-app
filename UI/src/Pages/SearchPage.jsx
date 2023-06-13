import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button, Card, Input, Select } from "@mantine/core"
import { getMarkerByMarkerId } from "../thunks/getMarkerById"
import { Link } from "react-router-dom"
import config from "../config"

export const SearchPage = () => {
  const [buildingSearchQuery, setBuildingSearchQuery] = useState("")
  const [personSearchQuery, setPersonSearchQuery] = useState("")
  const [buildingSearchResults, setBuildingSearchResults] = useState([])
  const [personSearchResults, setPersonSearchResults] = useState([])
  const [markers, setMarkers] = useState([])
  const token = localStorage.getItem("token")
  const baseUrl = config.baseUrl

  useEffect(() => {
    // Helper function to fetch marker by markerId
    const fetchMarker = async (markerId) => {
      try {
        const response = await getMarkerByMarkerId(markerId)
        return response
      } catch (error) {
        console.error("Error fetching marker:", error)
        return null
      }
    }

    // Fetch markers for building search results
    const fetchBuildingMarkers = async () => {
      const fetchedMarkers = await Promise.all(
        buildingSearchResults.map((result) => fetchMarker(result.markerId))
      )
      setMarkers(fetchedMarkers)
    }

    // Fetch markers for person search results
    const fetchPersonMarkers = async () => {
      const fetchedMarkers = await Promise.all(
        personSearchResults.map((result) => fetchMarker(result.markerId))
      )
      setMarkers(fetchedMarkers)
    }

    // Fetch markers based on search results
    if (buildingSearchResults.length > 0) {
      fetchBuildingMarkers()
    } else if (personSearchResults.length > 0) {
      fetchPersonMarkers()
    }
  }, [buildingSearchResults, personSearchResults])

  const handleBuildingSearch = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/volunteer/incidentTypeSearch`,
        {
          params: { query: buildingSearchQuery },
          headers: {
            Authorization: token
          }
        }
      )

      console.log("Building search results:", response.data)
      setBuildingSearchResults(response.data)
    } catch (error) {
      console.error("Error performing building search:", error)
    }
  }

  const handlePersonSearch = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/volunteer/personSearch`,
        {
          params: { query: personSearchQuery },
          headers: {
            Authorization: token
          }
        }
      )

      console.log("Person search results:", response.data)
      setPersonSearchResults(response.data)
    } catch (error) {
      console.error("Error performing person search:", error)
    }
  }
  const handleAddressClick = (address) => {
    const formattedAddress = address.replace(/\s/g, "+")
    const url = `https://www.google.com/maps/dir/?api=1&destination=${formattedAddress}`
    window.open(url, "_blank")
  }

  return (
    <div>
      <div>
        <h1>Yardım gereken yerleri sırala</h1>
        <Select
          data={[
            { label: "Yangın Bilgisi", value: "Yangın" },
            { label: "Gaz Kaçağı Bilgisi", value: "Gaz kaçağı" },
            { label: "Genel Hasar Bilgisi", value: "Deprem" }
            // Diğer tipleri buraya ekleyebilirsiniz
          ]}
          type="text"
          value={buildingSearchQuery}
          onChange={(value) => setBuildingSearchQuery(value)}
        />
        <Button variant="default" onClick={handleBuildingSearch}>
          Search
        </Button>
        <ul>
          {buildingSearchResults.length > 0 ? (
            buildingSearchResults.map((result, index) => (
              <Card key={index} className="mt-2 my-5 mx-5 ">
                <li>{"Olay Tipi: " + "" + result.type}</li>
                {result.details.personInfos && (
                  <>
                    <h2>Yaralananlar:</h2>
                    <ul className="my-5 mx-5">
                      {result.details.personInfos.map((person, index1) => (
                        <Card key={index1}>
                          <p className="font-bold">{"Kişi: " + (index1 + 1)}</p>
                          <li key={index1}>{"Adı: " + person.name}</li>
                          <li key={index1}>{"Soyadı: " + person.surname}</li>
                          <li key={index1}>{"TC Kimlik No: " + person.tcNo}</li>
                          <li key={index1}>
                            {"Sağlık Durumu: " + person.health}
                          </li>
                        </Card>
                      ))}
                    </ul>
                  </>
                )}
                {markers[index] && (
                  <>
                    <h2>Adres:</h2>
                    <Link
                      className="address-link"
                      onClick={() => handleAddressClick(markers[index].address)}
                    >
                      {markers[index].address}
                    </Link>
                  </>
                )}
              </Card>
            ))
          ) : (
            <div>Aradığınız kriterlere uygun sonuç bulunamadı</div>
          )}
        </ul>
      </div>

      <div>
        <h1>Kişi arama</h1>
        <Input
          type="text"
          value={personSearchQuery}
          onChange={(e) => setPersonSearchQuery(e.target.value)}
        />
        <Button variant="default" onClick={handlePersonSearch}>
          Search
        </Button>
        <ul>
          {personSearchResults.length > 0 ? (
            personSearchResults.map((result, index) => (
              <Card key={index} className="mt-2">
                <h1 className="text-2xl text-justify">
                  {"Olay tipi: " + result.type}
                </h1>
                <h2>Olayda Yaralananlar:</h2>
                <ul>
                  {result.details.personInfos.map((person, index1) => (
                    <Card key={index1}>
                      <p className="font-bold">{"Kişi: " + (index1 + 1)}</p>
                      <li key={index1}>{"Adı: " + person.name}</li>
                      <li key={index1}>{"Soyadı: " + person.surname}</li>
                      <li key={index1}>{"TC Kimlik No: " + person.tcNo}</li>
                      <li key={index1}>{"Sağlık Durumu: " + person.health}</li>
                    </Card>
                  ))}
                </ul>
                {markers[index] && (
                  <>
                    <h2>Adres:</h2>
                    <Link
                      className="address-link"
                      onClick={() => handleAddressClick(markers[index].address)}
                    >
                      {markers[index].address}
                    </Link>
                  </>
                )}
              </Card>
            ))
          ) : (
            <div>Aradığınız kriterlere uygun sonuç bulunamadı</div>
          )}
        </ul>
      </div>
    </div>
  )
}
