import { Router } from 'express'
const router = new Router()
import { authController } from '../controllers'
import protect from '../middlewares/auth'
import validate from '../middlewares/validate'
import { authValidation } from '../validations'

router.post(
  '/register',
  validate(authValidation.register),
  authController.register
)
router.post(
  '/activation',
  validate(authValidation.activate),
  authController.activate
)
router.post('/login', validate(authValidation.login), authController.login)
router.get('/access-token', authController.accessToken)
router.post(
  '/forgot-password',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
)
router.post(
  '/reset-password',
  protect,
  validate(authValidation.resetPassword),
  authController.resetPassword
)
router.get('/info', protect, authController.info)
router.patch(
  '/user-update',
  protect,
  validate(authValidation.updateInfo),
  authController.updateInfo
)
router.post('/logout', protect, authController.logout)

router.patch('/google-signing', authController.loginWithGoogle)
router.patch('/facebook-signing', authController.loginWithFacebook)

export default router
