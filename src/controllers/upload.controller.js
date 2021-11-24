import catchAsync from '../utils/catchAsync'
import { uploadService } from '../services'

/**
 * Upload avatar
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

export { uploadAvatar }
