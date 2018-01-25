const router = require('express').Router()
const bcrypt = require('bcrypt')
const getToken = require('../../../auth/create_token')
const checkIfUserExists = require('../../../helpers/get_user_by_email')

router.post('/', (req, res, next) => {

  let data = req.body

  if (!data.email && !data.password) {
    return res.send(400, { error: 'No email or password supplied' })
  }
  if (!data.email) {
    return res.send(400, { error: 'No email supplied' })
  }
  if (!data.password) {
    return res.send(400, { error: 'No password supplied' })
  }

  let email = data.email.toLowerCase()

  checkIfUserExists(email)
    .then((user) => {
      let stored_password = user.get('password')

      if (bcrypt.compareSync(data.password, stored_password) && user.admin) {
        let user_json = user.get({ plain: true })

        delete user_json.password
        let token = getToken(data.email)

        return res.json({
          result: 'Logged in',
          token: token,
          user: user_json
        })
      } else if (bcrypt.compareSync(data.password, stored_password)) {
        throw 'User is not admin'
      } else {
        throw 'Password incorrect'
      }
    })
    .catch((error) => {
      return res.status(401).json({ message: error })
    })

})

module.exports = router
