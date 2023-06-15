import { useState } from "react"
import AdminLogin from "../components/AdminLogin"
import VolunteerLogin from "../components/VolunteerLogin"
import React from "react"
import { Button } from "@mantine/core"

export default function LoginPage() {
  const [showVolunteerLogin, setShowVolunteerLogin] = useState(false)

  const handleToggleVolunteerLogin = () => {
    setShowVolunteerLogin(!showVolunteerLogin)
  }

  return (
    <div className="flex flex-col justify-center items-center content-center place-self-center">
      <div className="w-[100%]">
        {!showVolunteerLogin && (
          <div className="w-[100%]">
            <AdminLogin />
          </div>
        )}
        {showVolunteerLogin && (
          <div className="w-[100%]">
            <VolunteerLogin />
          </div>
        )}
      </div>
      <div className="row mt-4">
        <div className="flex items-center justify-center">
          {showVolunteerLogin && (
            <Button
              type="submit"
              variant="outline"
              color="blue"
              className="btn btn-secondary"
              onClick={handleToggleVolunteerLogin}
            >
              Yetkili Girişi
            </Button>
          )}
          {!showVolunteerLogin && (
            <Button
              type="submit"
              variant="outline"
              color="blue"
              className="btn btn-secondary"
              onClick={handleToggleVolunteerLogin}
            >
              Gönüllü Girişi
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
