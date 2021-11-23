import multer from 'multer'
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/')
  },
  // filename
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  cb(null, true)
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
})

const uploadSingle = name => (req, res, next) => {
  return upload.single(name)(req, res, next)
}

export default uploadSingle
