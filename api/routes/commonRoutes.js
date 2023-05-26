const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const routeConsts = require("./routeConsts").getRoutes()

// Auth Routes
router.post(routeConsts.ADMIN_LOGIN, authController.login)
router.post(routeConsts.VOLUNTEER_LOGIN, authController.loginAsVolunteer)

module.exports = router
