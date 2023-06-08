const validator = require("../util/validator")

const validate = (req, res, next) => {
  validator.validateByEndpoint(req, res)
  if (res.statusCode === "400") {
    return res.status(400).json({ message: "invalid phonenumber" })
  }
  next()
}

module.exports = validate
