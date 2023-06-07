require("dotenv").config()

const config = {
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL || "mongodb://mongodb0.example.com:27017"
}

module.exports = config
