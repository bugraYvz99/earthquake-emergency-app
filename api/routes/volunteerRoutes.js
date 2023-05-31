const express = require("express")
const router = express.Router()
const markerController = require("../controllers/markerController")
const userController = require("../controllers/userController")
const incidentsController = require("../controllers/incidentController")
const searchController = require("../controllers/searchController")
router.get("/markers", markerController.getAllMarkers)
router.post("/markers", markerController.createMarker)
router.get("/markers/:id", markerController.getMarkerByMarkerId)

router.get("/incidentTypeSearch", searchController.incidentTypeSearch)
router.get("/personSearch", searchController.personSearch)

// User Routes
router.get("/get-UserData", userController.getUserData)
// Marker Routes
router.delete("/incidents/:id", incidentsController.deleteIncident)
router.post("/incidents", incidentsController.createIncidentForMarker)
router.get("/incidents/:markerId", incidentsController.getIncidentsByMarkerId)
module.exports = router
