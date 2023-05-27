const Incident = require("../data/models/incidentModel")

exports.createIncident = async (incidentData, markerId, phoneNumber, name) => {
  const incident = new Incident(incidentData)
  incident.markerId = markerId
  incident.phoneNumber = phoneNumber
  incident.userName = name
  await incident.save()
}
exports.getIncidentsByMarkerId = async (markerId) => {
  try {
    const incidents = await Incident.find({ markerId })

    return incidents
  } catch (error) {
    console.log(error)
    throw new Error("Error retrieving incidents")
  }
}
