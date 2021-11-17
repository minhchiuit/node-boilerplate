import mongoose from 'mongoose'
import config from './config.js'
import logger from './logger.js'

const connect = async () => {
  const options = {}
  const conn = await mongoose.connect(config.mongodb_uri, options)
  logger.info(`MongDB Connected: ${conn.connection.host}`.yellow.bold.underline)
}
export default { connect }
