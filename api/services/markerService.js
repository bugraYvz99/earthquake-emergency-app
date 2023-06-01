const Marker = require("../data/models/markerModel")

exports.createMarker = async (userName, userNumber, position, address, _id) => {
  const marker = new Marker({
    userName,
    userNumber,
    position,
    address
  })
  marker.userId = _id

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
exports.deleteMarker = async (markerId) => {
  try {
    // Find the marker by its ID
    const marker = await Marker.findById(markerId)

    if (!marker) {
      // If the marker is not found, throw an error or return false
      throw new Error("Marker not found")
      // Alternatively, you can return false to indicate failure
      // return false;
    }

    // Delete the marker
    await marker.deleteOne()

    // Return true to indicate success
    return true
  } catch (error) {
    console.error(error)
    // Handle the error and return false to indicate failure
    return false
  }
}
