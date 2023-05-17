import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "../layout/Layout"
import { Home } from "../components/Home"
import Login from "../Pages/Login"
import { LogEvent } from "../Pages/LogEvent"
import DataShowPage from "../Pages/DataShowPage"
const Router = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          localStorage.getItem("token") ? <Navigate to="/" /> : <Login />
        }
      />

      <Route
        path="/"
        element={
          localStorage.getItem("token") ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/page1"
        element={
          localStorage.getItem("token") ? (
            <Layout>
              <LogEvent />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/hasarlar"
        element={
          localStorage.getItem("token") ? (
            <Layout>
              <DataShowPage />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  )
}

export default Router
