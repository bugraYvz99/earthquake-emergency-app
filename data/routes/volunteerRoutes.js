const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const markerController = require("../controllers/markerController");
const userController = require("../controllers/userController");
const incidentController = require("../controllers/incidentController");

router.get("/markers", markerController.getAllMarkers);
router.post("/markers", markerController.createMarker);
// User Routes
router.get("/get-UserData", userController.getUserData);
// Marker Routes

router.post("/saveIncident", incidentController.createIncidentController);

module.exports = router;
