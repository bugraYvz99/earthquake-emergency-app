const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const markerController = require("../controllers/markerController")
const userController = require("../controllers/userController")

router.get("/markers", markerController.getAllMarkers)
router.post("/markers", markerController.createMarker)
// User Routes
router.get("/get-UserData", userController.getUserData)
// Marker Routes

module.exports = router
