// searchController.js
const Incident = require("../data/models/incidentModel")

exports.incidentTypeSearch = async (req, res) => {
  const { query } = req.query

  try {
    if (!query) {
      return res.status(200).json([])
    }
    // Perform incident type search using the query parameter
    const searchResults = await Incident.find({
      type: { $regex: query, $options: "i" }
    }).exec()

    res.status(200).json(searchResults)
  } catch (error) {
    console.error("Error searching incidents by type:", error)
    res
      .status(500)
      .json({ error: "An error occurred while searching incidents by type" })
  }
}

// incidentController.js

exports.personSearch = async (req, res) => {
  const { query } = req.query

  try {
    if (!query) {
      return res.status(200).json([])
    }
    const incidents = await Incident.find({
      "details.personInfos": {
        $elemMatch: {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { surname: { $regex: query, $options: "i" } },
            { tcNo: { $regex: query, $options: "i" } }
          ]
        }
      }
    })

    res.status(200).json(incidents)
  } catch (error) {
    console.error("Error performing person search:", error)
    res
      .status(500)
      .json({ error: "An error occurred while searching incidents" })
  }
}
