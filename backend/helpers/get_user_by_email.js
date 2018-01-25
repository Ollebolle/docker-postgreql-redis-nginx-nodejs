const user = require('../models/user')

module.exports = email => (
  user.findOne({ where: { email: email } })
    .then((found_user) => {
      if (!found_user) {
        throw 'User does not exist'
      } else {
        return found_user
      }
    })
)
