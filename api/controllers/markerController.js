const markerService = require("../services/markerService")
const Marker = require("../data/models/markerModel")
const IncidentService = require("../services/incidentService")
exports.createMarker = async (req, res) => {
  try {
    const { userName, userNumber, position, address, incidentData } = req.body
    const { phoneNumber, name, _id } = req.user
    const marker = await markerService.createMarker(
      userName,
      userNumber,
      position,
      address,
      _id
    )
    console.log(incidentData)
    if (!marker) {
      return res
        .status(500)
        .json({ success: false, message: "Marker could not be created" })
    }

    // Check if incidentData values are empty

    // Assign markerId to incidentData

    const incident = await IncidentService.createIncident(
      incidentData,
      marker._id,
      phoneNumber,
      name,
      _id
    )

    res.status(200).json({ success: true, marker })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ success: false, message: "Marker could not be created" })
  }
}
// Marker puanlama endpoint'i
exports.rateMarker = async (req, res) => {
  try {
    const markerId = req.params.markerId // Puanlanacak marker'ın _id bilgisi
    console.log(markerId)
    const marker = await Marker.findById(markerId)

    if (!marker) {
      return res.status(404).json({ message: "Marker bulunamadı." })
    }

    // Puanlama işlemi
    marker.rate = req.body.puan
    console.log(marker.rate)

    await marker.save()

    res.status(200).json({ success: true, message: "Marker puanlandı." })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Marker puanlama işlemi başarısız oldu."
    })
  }
}
exports.getAllMarkers = async (req, res) => {
  try {
    const markers = await markerService.getAllMarkers()
    res.status(200).json({ success: true, markers })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Failed to get markers" })
  }
}
exports.getMarkerByMarkerId = async (req, res) => {
  const { id } = req.params

  try {
    const marker = await markerService.getMarkerByMarkerId(id)
    if (!marker) {
      return res.status(404).json({ message: "marker not found" })
    }

    res.status(200).json({ marker })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server Error" })
  }
}