const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const user = require('../models/user')
const secret = require('./../config').auth_key

let opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT')
opts.secretOrKey = secret

passport.use(
  'default',
  new JwtStrategy(opts, ((jwt_payload, done) => {
    let email = jwt_payload.email.toLowerCase()

    user.findOne({ where: { email } })
      .then((found_user) => {
        if (found_user) {
          done(null, found_user)
        } else {
          console.log(`Authorization - User cannot be found: ${ email}`)
          done(null, false)
        }
      })
      .catch((error) => {
        console.log(`Authorization - Failed for: ${ email}`)
        done(null)
      })
  })
  )
)

passport.use(
  'admin',
  new JwtStrategy(opts, ((jwt_payload, done) => {
    let email = jwt_payload.email.toLowerCase()

    user.findOne({ where: { email } })
      .then((found_user) => {
        if (found_user && found_user.admin) {
          done(null, found_user)
        } else {
          done(null, false)
        }
      })
      .catch((error) => {
        console.log(`Authorization - Failed for: ${ email}`)
        done(null)
      })
  })
  )
)

module.exports = passport
