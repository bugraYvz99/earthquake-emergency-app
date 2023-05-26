const express = require("express")
const router = express.Router()
const markerController = require("../controllers/markerController")
const userController = require("../controllers/userController")

module.exports = router

router.post("/markers/:markerId/rateMarker", markerController.rateMarker)
