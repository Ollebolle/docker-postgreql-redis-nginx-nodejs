const router = require('express').Router()
const bcrypt = require('bcrypt')
const getToken = require('../../../auth/create_token')
const checkIfUserExists = require('../../../helpers/get_user_by_email')

router.post('/', (req, res, next) => {

  let data = req.body

  console.log(`Logging in: ${ data.email}`)

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
    .then((found_user) => {
      let stored_password = found_user.get('password')
      const is_authorized = bcrypt.compareSync(data.password, stored_password)

      if (is_authorized) {
        let user_json = found_user.get({ plain: true })
        let token = getToken(data.email)

        delete user_json.password

        return res.json({
          result: 'Logged in',
          token: token,
          user: user_json
        })
      } else {
        throw 'Password incorrect'
      }
    })
    .catch((error) => {
      return res.status(401).json({ message: error })
    })

})

module.exports = router
