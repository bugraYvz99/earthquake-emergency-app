import React, { useState, useEffect } from "react"
import Map from "../components/Map"

export const LogEvent = () => {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ latitude, longitude })
        },
        (error) => {
          console.error("Konum alınamadı:", error)
        }
      )
    } else {
      console.error("Tarayıcınız konum özelliğini desteklemiyor.")
    }
  }, [])

  return (
    <div className="flex items-center justify-center">
      {location ? (
        <Map location={location} />
      ) : (
        <p>Konum bilgisi alınıyor...</p>
      )}
    </div>
  )
}
