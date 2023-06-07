const jwt = require("jsonwebtoken")
const config = require("../config")

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token bulunamadı. Yetkilendirme reddedildi." })
  }

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Geçersiz token. Yetkilendirme reddedildi." })
    }

    req.user = user
    next()
  })
}

module.exports = authenticateToken
