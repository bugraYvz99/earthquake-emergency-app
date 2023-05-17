import { useState } from "react"
import axios from "axios"
import { Button, Input, Card } from "@mantine/core"

const AdminLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          phoneNumber,
          password
        }
      )
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
      className="grid col-span-4 mx-auto "
    >
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={handleSubmit}
      >
        <h2>Log In</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <Input.Wrapper label="Phone Number" required>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            id="phoneNumber"
            type="text"
            required
          />
        </Input.Wrapper>
        <Input.Wrapper label="Password" required>
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
          Log In
        </Button>
      </form>
    </Card>
  )
}

export default AdminLogin
