const jwt = require("jsonwebtoken")
require("dotenv")

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token bulunamadı. Yetkilendirme reddedildi." })
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
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
