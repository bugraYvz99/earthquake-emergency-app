const express = require("express")
const router = express.Router()
const markerController = require("../controllers/markerController")

router.post("/markers", markerController.createMarker)
router.post("/markers/:id/rateMarker", markerController.rateMarker)
module.exports = router
