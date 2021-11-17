import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import hpp from 'hpp'
import cors from 'cors'
import httpError from 'http-errors'
import 'colors'

import logger from './config/logger.js'
import db from './config/db.js'
import config from './config/config.js'
import errorHandler from './middlewares/error.js'
import routes from './routes/_index.js'
import { authLimiter } from './config/rateLimit.js'

// connect to database
db.connect()

// init app
const app = express()

// body parser
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// cookie parser
app.use(cookieParser())

// dev logging middleware
if (config.env === 'development') {
  app.use(morgan('dev'))
}

// sanitize data
app.use(mongoSanitize())

// set security headers
app.use(helmet())

// prevent XSS attacks
app.use(xss())

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/api/auth', authLimiter)
}

// prevent http param pollution
app.use(hpp())

// enable CORS
app.use(cors())

// Set static folder

// api routes
app.use('/api', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  return next(new httpError.NotFound())
})

// handle error
app.use(errorHandler)

const server = app.listen(
  config.app_port,
  logger.info(
    `Server running in ${config.env} mode on port ${config.app_port}`.cyan
  )
)

// Handle unhandled promise rejections
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}
const unexpectedErrorHandler = error => {
  logger.error(error)
  exitHandler()
}
process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})
