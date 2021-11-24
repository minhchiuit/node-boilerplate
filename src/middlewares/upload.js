import fs from 'fs'
import createHttpError from 'http-errors'
import config from '../config/config'
import { transValidations } from '../../lang/en'

export default (req, res, next) => {
  // check file exist
  if (typeof req.file === 'undefined' || typeof req.body === 'undefined')
    throw new createHttpError.BadRequest(transValidations.upload_issue)

  // app use upload
  const image = req.file.path
  // file type
  if (!config.avatar_types.includes(req.file.mimetype)) {
    // remove file
    fs.unlinkSync(image)
    throw new createHttpError.BadRequest(transValidations.upload_not_supported)
  }

  // file size
  if (req.file.size > config.avatar_limit_size) {
    // remove file
    fs.unlinkSync(image)
    throw new createHttpError.BadRequest(transValidations.upload_limit_size)
  }

  // success
  next()
}
