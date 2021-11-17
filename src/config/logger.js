import winston from 'winston'
import config from './config.js'

const { createLogger, format, transports } = winston

// enumerate error
const enumerateErrorFormat = format(info => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack })
  }
  return info
})

// custom format log
const customFormat = format.combine(
  enumerateErrorFormat(),
  config.env === 'development' ? format.colorize() : format.uncolorize(),
  format.splat(),
  format.printf(({ level, message }) => `[${level}]: ${message}`)
)

// logger
const logger = createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: customFormat,
  transports: [
    new transports.Console({
      stderrLevels: ['error'],
    }),
  ],
})

export default logger
