import axios from "axios"
import { useState } from "react"
import { Button, Input, Card } from "@mantine/core"
import config from "../config"

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
      className="grid col-span-4 mx-auto "
    >
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={handleSubmit}
      >
        <h2>Register as Volunteer</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <Input.Wrapper label="Phone Number" required>
          <Input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label="First Name" required>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Last Name" required>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Input.Wrapper>
        <Button type="submit" variant="outline" color="blue">
          Register
        </Button>
      </form>
    </Card>
  )
}

export default VolunteerLogin
