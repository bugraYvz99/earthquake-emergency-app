import { defineConfig } from "vite"
import React from "react"

export default defineConfig({
  server: {
    plugins: ["@vitejs/plugin-react"],
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true
      }
    }
  }
})
