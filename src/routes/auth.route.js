import { Router } from 'express'
const router = new Router()
import authController from '../controllers/auth.controller'
import protect from '../middlewares/auth'
import validate from '../middlewares/validate'
import {
  register,
  activate,
  signing,
  forgotPassword,
  resetPassword,
  updateInfo,
  singout,
} from '../validations/auth.validation'

router.post('/register', validate(register), authController.register)
router.post('/activation', validate(activate), authController.activate)
router.post('/signing', validate(signing), authController.signing)
router.get('/access-token', authController.accessToken)
router.post(
  '/forgot-password',
  validate(forgotPassword),
  authController.forgotPassword
)
router.post(
  '/reset-password',
  protect,
  validate(resetPassword),
  authController.resetPassword
)
router.post('/signout', authController.singout)
router.get('/info', validate(register), authController.info)
router.patch('/update-user', validate(updateInfo), authController.updateInfo)
router.patch('/google-signing', authController.loginWithGoogle)

export default router
