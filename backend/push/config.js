const gcm_key = require('../config').gcm_key

const settings = {
  gcm: {
    id: gcm_key
  },
  apn: {
    cert: `${__dirname }/cert.pem`,
    key: `${__dirname }/key.pem`,
    production: false
  }
}

const PushNotifications = new require('node-pushnotifications')

module.exports = new PushNotifications(settings)
