const Sequelize = require('sequelize')
const sequelize = require('../../db/config')

const gcm = sequelize.define('gcm',
  {
    token: {
      type: Sequelize.STRING,
      unique: true
    }
  },
  {
    freezeTableName: true
  }
)

module.exports = gcm
