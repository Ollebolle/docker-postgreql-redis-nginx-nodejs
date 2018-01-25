const Sequelize = require('sequelize')
const sequelize = require('../db/config')

const user = sequelize.define('user',
  {
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    freezeTableName: true
  }
)

module.exports = user
