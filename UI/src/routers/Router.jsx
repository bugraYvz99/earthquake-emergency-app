import React, { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "../layout/Layout"
import { Home } from "../components/Home"
import Login from "../Pages/Login"
import { LogEvent } from "../Pages/LogEvent"
import DataShowPage from "../Pages/DataShowPage"
import { useDispatch, useSelector } from "react-redux"
import { getTokenData } from "../thunks/getTokenData"
import CreateMarker from "../Pages/CreateMarker"
import MarkerDetails from "../Pages/MarkerDetails"
import { Rating } from "@mantine/core"
import RatingInput from "../components/RatingInput"
import { CreateIncident } from "../Pages/CreateIncident"
import { SearchPage } from "../Pages/SearchPage"
import { EmergencyCalls } from "../Pages/EmergencyCalls"

const Router = () => {
  const dispatch = useDispatch()

  // Token verisi ve yetkilendirme durumunu al
  const isAuthenticated = useSelector(
    (state) => state.user.status === "succeeded"
  )

  // Token doğrulamasını yap
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token && !isAuthenticated) {
      dispatch(getTokenData(token))
    }
  }, [dispatch, isAuthenticated])

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
          <Route
            path="/create-marker/:lat/:lng"
            element={
              <Layout>
                <CreateMarker />
              </Layout>
            }
          />
          <Route
            path="/marker-details/:markerId"
            element={
              <Layout>
                <MarkerDetails />
              </Layout>
            }
          />
          <Route
            path="/rate-marker/:markerId"
            element={
              <Layout>
                <RatingInput />
              </Layout>
            }
          />
          <Route
            path="/create-incident/:markerId"
            element={
              <Layout>
                <CreateIncident />
              </Layout>
            }
          />
          <Route
            path="/search-page"
            element={
              <Layout>
                <SearchPage />
              </Layout>
            }
          />
          <Route
            path="/emergency-calls"
            element={
              <Layout>
                <EmergencyCalls />
              </Layout>
            }
          />
        </Routes>
      )
    } else {
      return <Navigate to="/login" />
    }
  }
  useEffect(() => {
    const handleTokenDelete = () => {
      if (!localStorage.getItem("token")) {
        // Token silindiğinde kullanıcıyı /login sayfasına yönlendir
        window.location.href = "/login"
      }
    }

    window.addEventListener("storage", handleTokenDelete)

    return () => {
      window.removeEventListener("storage", handleTokenDelete)
    }
  }, [])

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
