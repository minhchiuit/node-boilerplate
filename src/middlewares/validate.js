import httpError from 'http-errors'
import logger from '../config/logger.js'
import { object } from 'yup'

const validate = schema => (req, res, next) => {
  try {
    const obj = {
      ...req.body,
      ...req.params,
      ...req.query,
    }

    const value = object(schema).noUnknown().validateSync(obj, {
      abortEarly: false,
      stripUnknown: false,
    })

    Object.assign(req, value)
    return next()
  } catch (error) {
    return next(httpError.BadRequest(error.errors))
  }
}

export default validate
