require("dotenv").config()

const config = {
  JWT_SECRET: "secret" || process.env.JWT_SECRET,
  PORT: 3000 || process.env.PORT,
  MONGO_URL: "mongodb://mongodb0.example.com:27017" || process.env.MONGO_URL
}

module.exports = config
