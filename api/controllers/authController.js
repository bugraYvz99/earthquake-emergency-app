const authService = require("../services/authService")

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body

    const token = await authService.loginUser(phoneNumber, password)

    res.json({ token })
  } catch (error) {
    console.error(error)
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
    console.error(err)
  }
}
