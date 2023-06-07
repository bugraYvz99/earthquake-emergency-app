// external imports
const mongoose = require("mongoose")
const config = require("../config")

async function dbConnect() {
  console.log(config)
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  mongoose
    .connect(config.MONGO_URL, {
      //   these are options to ensure that the connection is done properly
      useNewUrlParser: true,
      useUnifiedTopology: true,
      w: "majority"
    })
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!")
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!")
      console.error(error)
    })
}

module.exports = dbConnect
