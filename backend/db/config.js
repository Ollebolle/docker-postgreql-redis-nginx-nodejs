const Sequelize = require('sequelize')
const db_dbname = require('../config').db_dbname
const db_username = require('../config').db_username
const db_password = require('../config').db_password

const sequelize = new Sequelize(db_dbname, db_username, db_password, {
  host: 'postgres',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false
})

module.exports = sequelize
