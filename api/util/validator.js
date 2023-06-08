const routes = require("../routes/routeConsts")

exports.validateByEndpoint = (req, res) => {
  const routeList = routes.getRoutes()
  switch (req.originalUrl) {
    case getUrl(routeList.ADMIN_LOGIN):
      validateForADMIN_LOGIN(req, res)
      break
    case getUrl(routeList.VOLUNTEER_LOGIN):
      validateForVOLUNTEER_LOGIN(req, res)
      break
    default:
      break
  }
}

function validateForADMIN_LOGIN(req, res) {
  if (req.body.phoneNumber === "123") {
    return req.body.phoneNumber
  } else {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

    if (regex.test(req.body.phoneNumber)) {
      return req.body.phoneNumber
    } else {
      // Invalid phone number format
      return res.status(400).json({ error: "Invalid phone number format" })
    }
  }
}

function validateForVOLUNTEER_LOGIN(req, res) {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

  if (regex.test(req.body.phoneNumber)) {
    return req.body.phoneNumber
  } else {
    // Invalid phone number format
    return res.status(400).json({ error: "Invalid phone number format" })
  }
}

function getUrl(routeUrl) {
  return "/api" + routeUrl
}
