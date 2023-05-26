import "./App.css"
import Layout from "./layout/Layout"
import { MantineProvider, Text } from "@mantine/core"
import Router from "./routers/Router"
import { Provider } from "react-redux"
import store from "./Store/store"

function App() {
  return (
    <div>
      <Provider store={store}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Router />
        </MantineProvider>
      </Provider>
    </div>
  )
}

export default App
