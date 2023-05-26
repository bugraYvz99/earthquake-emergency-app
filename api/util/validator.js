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
    return res
  } else {
    //regex phonenumber check
  }
}

function validateForVOLUNTEER_LOGIN(req, res) {}

function getUrl(routeUrl) {
  return "/api" + routeUrl
}
