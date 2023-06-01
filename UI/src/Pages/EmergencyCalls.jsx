import React, { useEffect, useState } from "react"
import { List, ThemeIcon } from "@mantine/core"
import { IconPhone } from "@tabler/icons-react"
export const EmergencyCalls = () => {
  const [emergencyNumbers, setEmergencyNumbers] = useState(null)

  useEffect(() => {
    async function fetchEmergencyNumbers() {
      const response = await fetch("../calls.json")
      const data = await response.json()
      setEmergencyNumbers(data.emergencyNumbers)
    }
    fetchEmergencyNumbers()
  }, [])

  return (
    <div>
      <h1>Acil Durum Hatları</h1>
      {emergencyNumbers ? (
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconPhone size="1rem" />
            </ThemeIcon>
          }
        >
          {Object.entries(emergencyNumbers).map(([name, number]) => (
            <List.Item key={name}>
              {name}: {number}
            </List.Item>
          ))}
        </List>
      ) : (
        <p>Veriler yükleniyor...</p>
      )}
    </div>
  )
}
