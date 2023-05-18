const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

router.post("/auth/login", authController.login)
router.post("/auth/login-volunteer", authController.loginAsVolunteer)

module.exports = router
