require('dotenv').config()
const { expressjwt: jwt } = require('express-jwt')

const isAuthenticated = jwt({
  secret: 1234,
  algorithms: ['HS256'],
  requestProperty: 'playload',
  getToken: getTokenFromHeaders,
})


function getTokenFromHeaders(req) {

   console.log(req.headers.authorization)

    if (
    req.headers.authorization && 
    req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
 
    const token = req.headers.authorization.split(' ')[1]
    return token
  }

  return null
}


module.exports = {
  isAuthenticated,
}