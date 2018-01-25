const router = require('express').Router()
const bcrypt = require('bcrypt')
const user = require('../../../models/user')
const getToken = require('../../../auth/create_token')
const checkIfUserExists = require('../../../helpers/get_user_by_email')

const createUser = (data) => {
  let hashed_password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(12), null)

  return user.create({
    email: data.email,
    password: hashed_password
  })
    .then((created_user) => (
      {
        token: getToken(data.email),
        user: created_user
      }
    ))
}

router.post('/', (req, res, next) => {

  let data = req.body

  console.log(`Registering user: ${ data.email }`)

  if (!data.email && !data.password) {
    return res.send(400, 'No email or password supplied')
  }
  if (!data.email) {
    return res.send(400, 'No email supplied')
  }
  if (!data.password) {
    return res.send(400, 'No password supplied')
  }

  let email_formatted = data.email.toLowerCase()

  data.email = email_formatted

  checkIfUserExists(data.email)
    .then(() => createUser(data))
    .then(() => {
      let new_user = response.user.get({ plain: true })

      delete new_user.password
      return res.json({
        result: 'User registered',
        token: response.token,
        user: new_user
      })
    })
    .catch((error) => {
      return res.status(400).json({
        message: error
      })
    })

})

module.exports = router
