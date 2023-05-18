const mongoose = require("mongoose")

const markerSchema = new mongoose.Schema({
  position: {
    lat: { type: Number },
    lng: { type: Number }
  },
  binaAdi: { type: String },
  hasarMiktari: { type: String, required: false, default: "" },
  address: { type: String },
  rate: { type: Number }
})

const Marker = mongoose.model("Marker", markerSchema)

module.exports = Marker
