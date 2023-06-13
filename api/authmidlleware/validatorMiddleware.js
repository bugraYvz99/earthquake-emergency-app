const validator = require("../util/validator")

const validate = (req, res, next) => {
  try {
    validator.validateByEndpoint(req, res)
    next()
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = validate
