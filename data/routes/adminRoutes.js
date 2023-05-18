const express = require("express")
const router = express.Router()
const markerController = require("../controllers/markerController")
const userController = require("../controllers/userController")
router.post("/markers/:id/rateMarker", markerController.rateMarker)
module.exports = router
