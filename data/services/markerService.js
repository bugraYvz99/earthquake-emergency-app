const Marker = require("../data/models/markerModel");

exports.createMarker = async (position, binaAdi, hasarMiktari, address) => {
  const marker = new Marker({
    position,
    binaAdi,
    hasarMiktari,
    address,
  });

  await marker.save();
};
