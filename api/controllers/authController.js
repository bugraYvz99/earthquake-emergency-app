const authService = require("../services/authService")

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body

    const token = await authService.loginUser(phoneNumber, password)

    res.status(200).json({ success: true, token })
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: error.message })
  }
}
exports.loginAsVolunteer = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body

    const token = await authService.loginAsVolunteer(
      firstName,
      lastName,
      phoneNumber
    )

    res.status(200).json({ success: true, token })
  } catch (err) {
    res.status(400).json({ message: error.message })
  }
}
