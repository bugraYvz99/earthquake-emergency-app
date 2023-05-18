const Marker = require("../data/models/markerModel")

exports.createMarker = async (position, binaAdi, hasarMiktari, address) => {
  const marker = new Marker({
    position,
    binaAdi,
    hasarMiktari,
    address
  })

  await marker.save()
}
exports.getAllMarkers = async () => {
  try {
    const markers = await Marker.find()
    return markers
  } catch (error) {
    throw new Error("Failed to get markers from the database")
  }
}
