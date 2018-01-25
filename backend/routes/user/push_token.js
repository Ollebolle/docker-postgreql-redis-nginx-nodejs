const router = require('express').Router()
const passport = require('./../../auth/passport')
const gcm = require('../../models/push/gcm')
const apn = require('../../models/push/apn')

const createToken = (type, token, userId) => {
  if (type === 'apn') {
    return apn.create({
      token,
      userId
    })
  } else if (type === 'gcm') {
    return gcm.create({
      token,
      userId
    })
  }
}

router.post('/',
  passport.authenticate('default', { session: false }),
  (req, res, next) => {

    let data = req.body
    let userId = req.user.id
    let type = data.type
    let token = data.token

    createToken(type, token, userId)
      .then((created_token) => {
        return res.json({
          result: 'Push token created'
        })
      })
      .catch((error) => {
        return res.json({
          result: 'Push token already exists'
        })
      })

  }
)

module.exports = router
