import { Router } from 'express'
import upload from '../middlewares/upload'
import uploadSingle from '../middlewares/uploadImage'
import protect from '../middlewares/auth'
import uploadController from '../controllers/upload.controller'
const router = new Router()

router.post(
  '/',
  protect,
  uploadSingle('avatar'),
  upload,
  uploadController.uploadAvatar
)

export default router
