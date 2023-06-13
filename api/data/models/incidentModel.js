const mongoose = require("mongoose")

// Define the schema for the incidents collection
const incidentSchema = new mongoose.Schema({
  phoneNumber: String,
  userId: String,
  userName: String,
  id: String,
  type: String,
  markerId: String,
  location: {
    lat: Number,
    long: Number
  },
  details: Object,
  media: [
    {
      id: String,
      url: String,
      type: String
    }
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

// Create the incidents model
const Incident = mongoose.model("Incident", incidentSchema)

module.exports = Incident
