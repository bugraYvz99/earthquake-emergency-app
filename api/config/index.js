require("dotenv").config()

const config = {
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  PORT: process.env.PORT || 3000,
  MONGO_URL:  "mongodb+srv://Bugrayvz99:Ankara06@cluster0.waoibxb.mongodb.net/Database?retryWrites=true&w=majority"
}

module.exports = config
