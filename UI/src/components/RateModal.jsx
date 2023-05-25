import React, { useState } from "react"
import { Modal, Button } from "@mantine/core"

const RateModal = ({ onConfirm, onCancel, userRole, selectedMarker }) => {
  const [opened, setOpened] = useState(true)
  const userNumber = selectedMarker.userNumber
  const userName = selectedMarker.userName
  const handleConfirm = () => {
    setOpened(false)
    onConfirm()
  }

  const handleClose = () => {
    setOpened(false)
    onCancel()
  }

  return (
    <Modal padding="lg" opened={opened} onClose={handleClose}>
      <p>{"Olayı Bildiren kişinin Telefon numarası:" + userNumber}</p>
      <p>{"Olayı Bildiren kişinin adı:" + userName}</p>
      <h2 className="font-bold">
        {userRole === "admin" ? "Olayı Puanla" : "Detayları Görüntüle"}
      </h2>
      <Modal.Body>
        {userRole === "admin"
          ? "Yetkili kişi olarak olay derecesini puanlamak ister misiniz?"
          : "Olay detaylarını görmek ister misiniz?"}
      </Modal.Body>
      <div className="flex flex-row justify-between">
        {userRole === "admin" ? (
          <>
            <Button variant="outline" uppercase onClick={handleConfirm}>
              Puan ver
            </Button>
            <Button variant="outline" uppercase onClick={handleClose}>
              Detayları Görüntüle
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" uppercase onClick={handleConfirm}>
              Detayları Görüntüle
            </Button>
            <Button variant="outline" uppercase onClick={handleClose}>
              Geri dön
            </Button>
          </>
        )}
      </div>
    </Modal>
  )
}

export default RateModal
