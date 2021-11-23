import config from '../config/config'
import cloudinary from 'cloudinary'
import fs from 'fs'
cloudinary.v2.config({
  cloud_name: config.cloud.name,
  api_key: config.cloud.apiKey,
  api_secret: config.cloud.apiSecret,
})

/**
 *
 * @param {string} path link to file image in local
 * @param {string} folder store in cloudinary
 */
const upload = async (path, options) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(path, options, (err, result) => {
      if (err) return reject(err)
      fs.unlinkSync(path)
      return resolve({ url: result.secure_url })
    })
  })
}

const uploadAvatar = async path => {
  const options = {
    folder: 'avatar',
    width: 150,
    height: 150,
    crop: 'fill',
  }
  const result = await upload(path, options)
  return result
}

export { upload, uploadAvatar }
