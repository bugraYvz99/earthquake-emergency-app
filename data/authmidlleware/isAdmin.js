const isAdmin = (req, res, next) => {
  // Kullanıcıyı kontrol et
  const user = req.user
  if (user.role === "admin") {
    // Admin yetkisi varsa devam et
    next()
  } else {
    // Admin yetkisi yoksa yetkilendirme reddedildi hatası döndür
    res
      .status(403)
      .json({ message: "Admin yetkisi gerekiyor. Yetkilendirme reddedildi." })
  }
}
module.exports = isAdmin
