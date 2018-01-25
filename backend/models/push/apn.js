const Sequelize = require('sequelize')
const sequelize = require('../../db/config')

const apn = sequelize.define('apn',
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

module.exports = apn
