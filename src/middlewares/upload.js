import fs from 'fs'

export default (req, res, next) => {
  // check file exist
  if (typeof req.file === 'undefined' || typeof req.body === 'undefined')
    return res
      .status(400)
      .json({ success: false, message: 'Issue with uploading this image.' })

  // app use upload
  const image = req.file.path

  // file type
  if (
    !req.file.mimetype.includes('jpeg') &&
    !req.file.mimetype.includes('jpg') &&
    !req.file.mimetype.includes('png')
  ) {
    // remove file
    fs.unlinkSync(image)
    return res
      .status(400)
      .json({ success: false, message: 'This file is not supported.' })
  }

  // file size
  if (req.file.size > 1024 * 1024) {
    // remove file
    fs.unlinkSync(image)
    return res
      .status(400)
      .json({ success: false, message: 'This file is too large (Max: 1MB ).' })
  }

  // success
  next()
}
