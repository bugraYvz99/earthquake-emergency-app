const Incident = require("../data/models/incidentModel")

exports.createIncident = async (incidentData, markerId) => {
  const incident = new Incident(incidentData)
  incident.markerId = markerId
  await incident.save()
}
exports.getIncidentByMarkerId = async (markerId) => {
  try {
    const incident = await Incident.findOne({ markerId })

    return incident
  } catch (error) {
    console.log(error)
    throw new Error("Error retrieving incident")
  }
}
