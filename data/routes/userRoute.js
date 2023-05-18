const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")

router.post("/get-UserData", userController.getUserData)

module.exports = router
