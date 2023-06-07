import React from "react"
import { List, ThemeIcon } from "@mantine/core"
import { IconPhone } from "@tabler/icons-react"

export const EmergencyCalls = () => {
  const data = {
    emergencyNumbers: {
      "AFAD Acil Yardım Hattı": "122",
      "İçişleri Bakanlığı Kriz Merkezi": "0312 422 9999",
      "112 Acil Servis": "112",
      "Yangın İhbar": "110",
      "Jandarma İmdat": "156",
      "Polis İmdat": "155",
      "Sahil Güvenlik İmdat": "158",
      "Arama Kurtarma İhbar": "156",
      "Beyaz Masa (İstanbul Büyükşehir Belediyesi)": "0212 455 5555",
      "İstanbul İtfaiye": "0212 455 4444",
      "İstanbul AFAD İl Müdürlüğü": "0212 456 5500",
      "İzmir Büyükşehir Belediyesi İtfaiye": "0232 293 9560",
      "İzmir AFAD İl Müdürlüğü": "0232 239 2070"
    }
  }

  return (
    <div>
      <h1>Acil Durum Hatları</h1>
      {data.emergencyNumbers ? (
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
          {Object.entries(data.emergencyNumbers).map(([name, number]) => (
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
