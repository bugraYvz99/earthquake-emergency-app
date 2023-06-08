import { useState } from "react"
import axios from "axios"
import { Button, Input, Card } from "@mantine/core"
import config from "../config"
import React from "react"

const AdminLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const baseUrl = config.baseUrl

      const { data } = await axios.post(`${baseUrl}/api/auth/login`, {
        phoneNumber,
        password
      })
      localStorage.setItem("token", data.token)
      window.location = "/"
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  return (
    <Card
      w={"83%"}
      shadow="xl"
      padding="lg"
      radius="md"
      withBorder
      className="grid col-span-4 mx-auto mt-32 shadow-2xl w-full"
    >
      <form
        className="flex flex-col items-center gap-5  justify-center"
        onSubmit={handleSubmit}
      >
        <h2 className=" font-serif text-lg font-semibold">
          Yetkili olarak giriş yap
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <Input.Wrapper label="Telefon numarası" required>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            id="phoneNumber"
            type="text"
            required
          />
        </Input.Wrapper>
        <Input.Wrapper label="Şifre" required>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            id="password"
            type="password"
            required
          />
        </Input.Wrapper>
        <Button type="submit" variant="outline" color="blue">
          Giriş yap
        </Button>
      </form>
    </Card>
  )
}

export default AdminLogin
