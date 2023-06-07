const express = require("express")
const app = express()
const dbConnect = require("./data/dbConnect")
const cors = require("cors")
const config = require("./config")
const auth = require("./authmidlleware")
const isAdmin = require("./authmidlleware/isAdmin")
const validate = require("./authmidlleware/validatorMiddleware")

const commonRoutes = require("./routes/commonRoutes")
const adminRouter = require("./routes/adminRoutes")
const volunteerRouter = require("./routes/volunteerRoutes")
const path = require("path")

app.use(cors())
app.use(express.json())
app.use(validate)

app.use("/", express.static(path.join(__dirname, "public")))

app.use("/api", commonRoutes)
app.use("/api/admin", auth, isAdmin, adminRouter)
app.use("/api/volunteer", auth, volunteerRouter)
app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})
app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`)
})

dbConnect()
