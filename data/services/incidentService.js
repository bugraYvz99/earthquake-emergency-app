const Incident = require("../data/models/incidentModel");

exports.createIncident = async (incidentData) => {
  const incident = new Incident(incidentData);
  await incident.save();
};
