const express = require("express")
const app = express()
const dbConnect = require("./data/dbConnect")
const cors = require("cors")
const config = require("./config")
const auth = require("./authmidlleware")
const isAdmin = require("./authmidlleware/isAdmin")

const commonRoutes = require("./routes/commonRoutes")
const adminRouter = require("./routes/adminRoutes")
const volunteerRouter = require("./routes/volunteerRoutes")

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use(cors())
app.use(express.json())

app.use("/api", commonRoutes)
app.use("/api/admin", auth, isAdmin, adminRouter)
app.use("/api/volunteer", auth, volunteerRouter)

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`)
})

dbConnect()
