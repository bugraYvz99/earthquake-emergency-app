const mongoose = require("mongoose")

// Define the schema for the incidents collection
const incidentSchema = new mongoose.Schema({
  phoneNumber: String,
  userName: String,
  id: String,
  type: String,
  markerId: String,
  location: {
    lat: Number,
    long: Number
  },
  details: {
    status: String,
    roof: String,
    floor: String,
    stairs: String,
    elevator: String,
    wall: String,
    column: String
  },
  media: [
    {
      id: String,
      url: String,
      type: String
    }
  ],
  persons: {
    inside: Number,
    trapped: Number,
    rescued: Number,
    dead: Number,
    injured: Number,
    identities: [
      {
        id: String,
        name: String,
        surname: String,
        tcNo: String
      }
    ]
  }
})

// Create the incidents model
const Incident = mongoose.model("Incident", incidentSchema)

module.exports = Incident
