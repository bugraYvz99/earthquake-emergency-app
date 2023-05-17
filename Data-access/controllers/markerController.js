const markerService = require("../services/markerService");

exports.createMarker = async (req, res) => {
  try {
    const { position, binaAdi, hasarMiktari, address } = req.body;

    marker = markerService.createMarker(
      position,
      binaAdi,
      hasarMiktari,
      address
    );

    res.status(200).json({ success: true, marker });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Marker could not be created" });
  }
};
