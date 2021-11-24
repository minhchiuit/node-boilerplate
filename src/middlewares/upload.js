import fs from 'fs'
import createHttpError from 'http-errors'
import config from '../config/config'

export default (req, res, next) => {
  // check file exist
  if (typeof req.file === 'undefined' || typeof req.body === 'undefined')
    throw new createHttpError.BadRequest('Issue with uploading this image.')

  // app use upload
  const image = req.file.path
  // file type
  if (!config.avatar_types.includes(req.file.mimetype)) {
    // remove file
    fs.unlinkSync(image)
    throw new createHttpError.BadRequest('This file is not supported.')
  }

  // file size
  if (req.file.size > config.avatar_limit_size) {
    console.log(config.avatar_limit_size)
    // remove file
    fs.unlinkSync(image)
    throw new createHttpError.BadRequest('This file is too large (Max: 1MB ).')
  }

  // success
  next()
}
