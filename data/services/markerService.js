const Marker = require("../data/models/markerModel")

exports.createMarker = async (userName, userNumber, position, address) => {
  const marker = new Marker({
    userName,
    userNumber,
    position,
    address
  })

  const savedMarker = await marker.save()
  return savedMarker
}
exports.getAllMarkers = async () => {
  try {
    const markers = await Marker.find()
    return markers
  } catch (error) {
    throw new Error("Failed to get markers from the database")
  }
}
exports.getMarkerByMarkerId = async (id) => {
  try {
    const marker = await Marker.findOne({ _id: id })

    return marker
  } catch (error) {
    console.log(error)
    throw new Error("Error retrieving marker")
  }
}
