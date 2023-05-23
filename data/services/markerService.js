const Marker = require("../data/models/markerModel");

exports.createMarker = async (position, address) => {
  const marker = new Marker({
    position,
    address,
  });

  const savedMarker = await marker.save();
  return savedMarker;
};
exports.getAllMarkers = async () => {
  try {
    const markers = await Marker.find();
    return markers;
  } catch (error) {
    throw new Error("Failed to get markers from the database");
  }
};
