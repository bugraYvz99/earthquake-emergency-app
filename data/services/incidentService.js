const Incident = require("../data/models/incidentModel")

exports.createIncident = async (incidentData) => {
  const incident = new Incident(incidentData)

  await incident.save()
  console.log("created")
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
