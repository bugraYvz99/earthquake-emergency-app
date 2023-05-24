const incidentService = require("../services/incidentService")

exports.createIncidentController = async (req, res) => {
  try {
    const incidentData = req.body // Assuming the incident data is passed in the request body
    incidentService.createIncident(incidentData)
    console.log(incidentData)
    res.status(201).json({ message: "Incident created successfully" })
  } catch (error) {
    console.error("Error creating incident:", error)
    res
      .status(500)
      .json({ error: "An error occurred while creating the incident" })
  }
}

exports.getIncidentByMarkerId = async (req, res) => {
  const { markerId } = req.params
  try {
    const incident = await incidentService.getIncidentByMarkerId(markerId)

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" })
    }

    res.status(200).json({ incident })
  } catch (error) {
    console.log("incident goes GG")
    console.log(error)
    res.status(500).json({ message: "Server Error" })
  }
}
