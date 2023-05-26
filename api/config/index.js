const config = {
  JWT_SECRET: "secret" || process.env.JWT_SECRET,
  PORT: 3000 || process.env.PORT,
  MONGO_URL:  process.env.MONGO_URL
}

module.exports = config
