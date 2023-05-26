const mongoose = require("mongoose")

const markerSchema = new mongoose.Schema({
  userNumber: { type: String },
  userName: { type: String },
  position: {
    lat: { type: Number },
    lng: { type: Number }
  },
  address: { type: String },
  rate: { type: Number, default: 0 }
})

const Marker = mongoose.model("Marker", markerSchema)

module.exports = Marker
