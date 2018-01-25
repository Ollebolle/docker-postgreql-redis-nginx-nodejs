const router = require('express').Router()
const passport = require('./../../auth/passport')
const user = require('../../models/user')

router.get('/',
  passport.authenticate('default', { session: false }),
  (req, res) => {
    console.log(`Find user by id: ${ req.user.id}`)
    user.findById(req.user.id, {
      attributes: [
        'id',
        'email',
        'credits',
        'creditsTotal',
        'createdAt'
      ]
    }).then((user_info) => {
      return res.json(user_info)
    })
  }
)

module.exports = router
