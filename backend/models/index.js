const sequelize = require('../db/config')

// User model
const user = require('./user')

// Push models
const apn = require('./push/apn')
const gcm = require('./push/gcm')

// User/Push relations
user.hasMany(gcm)
user.hasMany(apn)

// Synchronize tables
sequelize.sync()
  .then(() => {
    console.log('\x1b[33m%s\x1b[0m', 'Database synchronized')
  })
