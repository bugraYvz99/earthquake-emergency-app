import React, { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "../layout/Layout"
import { Home } from "../components/Home"
import Login from "../Pages/Login"
import { LogEvent } from "../Pages/LogEvent"
import DataShowPage from "../Pages/DataShowPage"
import { useDispatch, useSelector } from "react-redux"
import { getTokenData } from "../thunks/getTokenData"

const Router = () => {
  const dispatch = useDispatch()

  // Token verisi ve yetkilendirme durumunu al
  const tokenData = useSelector((state) => state.user.tokenData)
  const isAuthenticated = useSelector(
    (state) => state.user.status === "succeeded"
  )

  // Token doğrulamasını yap
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(getTokenData(token))
    }
  }, [dispatch])

  // Token doğrulama durumuna göre yönlendirme yap
  const renderRoutes = () => {
    if (isAuthenticated) {
      return (
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/page1"
            element={
              <Layout>
                <LogEvent />
              </Layout>
            }
          />
          <Route
            path="/hasarlar"
            element={
              <Layout>
                <DataShowPage />
              </Layout>
            }
          />
        </Routes>
      )
    } else {
      return <Navigate to="/login" />
    }
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route path="*" element={renderRoutes()} />
    </Routes>
  )
}

export default Router
