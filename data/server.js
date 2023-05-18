const express = require("express")
const app = express()
const dbConnect = require("./data/dbConnect")
const userRoutes = require("./routes/userRoute")
const markerRoute = require("./routes/markerRoute")
const authRoute = require("./routes/authRoute")
const cors = require("cors")
const config = require("./config")
const auth = require("./authmidlleware")

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use(cors())
app.use(express.json())
app.use("/api", userRoutes)
app.use("/api", markerRoute)
app.use("/api", authRoute)

app.use("/api", commonRoutes)
app.use("/api/admin", auth, adminMiddleware, AdminRouter)
app.use("/api/volunteer", auth, volunteerRouter)

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`)
})

dbConnect()
