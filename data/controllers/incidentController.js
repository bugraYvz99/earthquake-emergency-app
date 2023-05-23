const incidentService = require("../services/incidentService");

exports.createIncidentController = async (req, res) => {
  try {
    const incidentData = req.body; // Assuming the incident data is passed in the request body
    incidentService.createIncident(incidentData);
    res.status(201).json({ message: "Incident created successfully" });
  } catch (error) {
    console.error("Error creating incident:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the incident" });
  }
};
