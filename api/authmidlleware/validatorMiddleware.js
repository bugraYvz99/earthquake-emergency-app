const validator = require("../util/validator")

const validate = (req, res, next) => {
  validator.validateByEndpoint(req, res)
  next()
}

module.exports = validate
