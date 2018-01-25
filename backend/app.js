const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const swStats = require('swagger-stats')
const passport = require('./auth/passport')
const app = express()

app.use(swStats.getMiddleware({}))
app.use(morgan('dev'))

app.use(cors({ preflightContinue: true }))
app.options('*', cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(passport.initialize())

// Initiate db models
const models = require('./models')

// Health endpoint
const health = require('./routes/health')

app.use('/health', health)

// User endpoints
const user_get = require('./routes/user/get')
const register = require('./routes/user/auth/register')
const login = require('./routes/user/auth/login')
const push_token = require('./routes/user/push_token')

app.use('/user', user_get)
app.use('/user/register', register)
app.use('/user/login', login)
app.use('/user/push_token', push_token)

// Admin
const admin_login = require('./routes/admin/auth/login')

app.use('/admin/login', admin_login)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')

  err.status = 404
  next(err)
})


app.listen(process.env.PORT, () => {
  console.log('\x1b[32m', 'Server - up & running on port ${ process.env.PORT }!')
})

module.exports = app
