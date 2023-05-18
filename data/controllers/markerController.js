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

// Marker puanlama endpoint'i
exports.rateMarker = async (req, res) =>  {
  try {
   
    const markerId = req.params.id; // Puanlanacak marker'ın _id bilgisi

    const marker = await Marker.findById(markerId);

    if (!marker) {
      return res.status(404).json({ message: "Marker bulunamadı." });
    }

    // Puanlama işlemi
    marker.puan = req.body.puan;

    await marker.save();

    res.status(200).json({ success: true, message: "Marker puanlandı." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Marker puanlama işlemi başarısız oldu." });
  }
}

