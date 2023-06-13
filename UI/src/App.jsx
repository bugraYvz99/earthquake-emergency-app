import "./App.css"
// Mantine proje eklenişi
import { MantineProvider, Text } from "@mantine/core"
import Router from "./routers/Router"
import { Provider } from "react-redux"
import store from "./Store/store"
import React from "react"

function App() {
  return (
    <div>
      <Provider store={store}>
        <MantineProvider
          theme={{ loader: "bars" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Router />
        </MantineProvider>
      </Provider>
    </div>
  )
}

export default App
