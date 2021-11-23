/**
 * cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_api_key,
  api_secret: config.cloud_api_secret,
})

const uploader = folder =>
  new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file.path,
      {
        folder: folder,
        width: 150,
        height: 150,
        crop: 'fill',
      },
      (err, result) => {
        if (err) return reject(err)
        resolve(result.secure_url)
      }
    )
  })
export default uploader

 */
import config from './config'
import cloudinary from 'cloudinary'
cloudinary.v2.config({
  cloud_name: config.cloud.name,
  api_key: config.cloud.apiKey,
  api_secret: config.cloud.apiSecret,
})
cloudinary.v2.uploader.upload(path, {
  format: 'png',
  width: 100,
  height: 100,
  crop: 'fill',
})
