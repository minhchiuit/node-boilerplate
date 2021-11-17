import httpError from 'http-errors'
import logger from '../config/logger.js'

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  // Log to console for dev
  logger.error(err)

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`
    error = new httpError.NotFound(message)
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    error = new httpError.BadRequest(message)
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message)
    error = new httpError.BadRequest(message)
  }
  res.status(err.statusCode || 500).json({
    success: false,
    error: error.message || httpError.InternalServerError().message,
  })
}

export default errorHandler
