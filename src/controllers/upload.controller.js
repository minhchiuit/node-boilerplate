import createError from 'http-errors'
import catchAsync from '../utils/catchAsync'
import { uploadService } from '../services'

import config from '../config/config'
import {
  userService,
  authService,
  tokenService,
  emailService,
} from '../services'
import createHttpError from 'http-errors'

/**
 * @POST api/uploadAvatar
 * @access private
 */
const uploadAvatar = catchAsync(async (req, res) => {
  const result = await uploadService.uploadAvatar(req.file.path)
  return res.status(200).json({
    success: true,
    message: 'Upload successfully.',
    result,
  })
})

export default {
  uploadAvatar,
}
