const jwt = require('jsonwebtoken')
const secret = require('./../config').auth_key

module.exports = (email) => (
  jwt.sign(
    { email: email },
    secret,
    {
      expiresIn: '100d'
    }
  )
)
