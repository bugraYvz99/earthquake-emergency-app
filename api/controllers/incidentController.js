const incidentService = require("../services/incidentService")

exports.getIncidentsByMarkerId = async (req, res) => {
  const { markerId } = req.params
  try {
    const incidents = await incidentService.getIncidentsByMarkerId(markerId)
    const user = req.user

    if (incidents.length === 0) {
      return res
        .status(404)
        .json({ message: "No incidents found for the marker" })
    }

    // Check user ID and add isOwner property
    const incidentsWithOwnership = incidents.map((incident) => {
      if (incident.userId === user._id) {
        return { ...incident, isOwner: true }
      }
      return { ...incident, isOwner: false }
    })

    res.status(200).json({ incidents: incidentsWithOwnership })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server Error" })
  }
}

exports.createIncidentForMarker = async (req, res) => {
  try {
    const { markerId, incidentData } = req.body
    const { phoneNumber, name, _id } = req.user
    const incident = await incidentService.createIncident(
      incidentData,
      markerId,
      phoneNumber,
      name,
      _id
    )

    res.status(201).json({ message: "Incident created successfully", incident })
  } catch (error) {
    console.error("Error creating incident:", error)
    res
      .status(500)
      .json({ error: "An error occurred while creating the incident" })
  }
}
exports.updateIncident = async (req, res) => {
  try {
    const { markerId } = req.params
    const { incidentData } = req.body
    const { _id: userId } = req.user

    const updatedIncident = await incidentService.updateIncident(
      markerId,
      incidentData,
      userId
    )

    if (!updatedIncident) {
      return res.status(404).json({ message: "Incident not found" })
    }

    res.status(200).json({
      message: "Incident updated successfully",
      incident: updatedIncident
    })
  } catch (error) {
    console.error("Error updating incident:", error)
    res
      .status(500)
      .json({ error: "An error occurred while updating the incident" })
  }
}
exports.deleteIncident = async (req, res) => {
  try {
    const { id } = req.params

    // Veritabanından olayı silme işlemini gerçekleştirin
    // İlgili veritabanı işlemleri için incidentService'i kullanabilirsiniz

    const deletedIncident = await incidentService.deleteIncident(id)

    if (!deletedIncident) {
      return res.status(404).json({ message: "Incident not found" })
    }

    res.status(200).json({
      message: "Incident deleted successfully",
      incident: deletedIncident
    })
  } catch (error) {
    console.error("Error deleting incident:", error)
    res
      .status(500)
      .json({ error: "An error occurred while deleting the incident" })
  }
}
