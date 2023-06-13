import axios from "axios"
import { useState } from "react"
import { Button, Input, Card } from "@mantine/core"
import config from "../config"
import React from "react"

const VolunteerLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const baseUrl = config.baseUrl

      const response = await axios.post(`${baseUrl}/api/auth/login-volunteer`, {
        phoneNumber,
        firstName,
        lastName
      })
      localStorage.setItem("token", response.data.token)
      window.location = "/"
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <Card
      w={"83%"}
      shadow="xl"
      padding="lg"
      radius="md"
      withBorder
      className="grid col-span-4 mx-auto mt-32 shadow-2xl "
    >
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={handleSubmit}
      >
        <h2 className="  text-lg font-semibold">Gönüllü olarak giriş yap</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <Input.Wrapper label="Telefon numarası" required>
          <Input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Input.Wrapper>
        <Input.Wrapper label="Ad" required>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Soyad" required>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Input.Wrapper>
        <Button type="submit" variant="outline" color="blue">
          Giriş yap
        </Button>
      </form>
    </Card>
  )
}

export default VolunteerLogin
