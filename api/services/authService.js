const User = require("../data/models/userModel")

exports.loginAsVolunteer = async (name, lastName, phoneNumber) => {
  let user = await User.findOne({ phoneNumber, role: "volunteer" })

  if (!user) {
    user = new User({
      name,
      lastName,
      phoneNumber,
      role: "volunteer"
    })
    await user.save()
  }

  const token = user.generateAuthToken()
  return token
}
exports.loginUser = async (phoneNumber, password) => {
  try {
    const user = await User.findOne({ phoneNumber, role: "admin" })

    if (!user) {
      throw new Error("Telefon numarası bulunamadı")
    }

    if (password !== user.password) {
      throw new Error("Şifre yanlış")
    }

    const token = user.generateAuthToken()
    return token
  } catch (error) {
    throw error
  }
}
