import { Router } from 'express'
const router = new Router()
import validate from '../middlewares/validate'
import { userValidation } from '../validations'
import { auth, protect } from '../middlewares/auth'
import { userController } from '../controllers'

router
  .route('/')
  .post(
    auth('admin'),
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(
    auth('admin'),
    validate(userValidation.getUsers),
    userController.getUsers
  )

router.get('/me', protect, userController.getMe)
router.patch(
  '/update-me',
  protect,
  validate(userValidation.updateMe),
  userController.updateMe
)

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUser)
  .patch(
    auth('admin'),
    validate(userValidation.updateUser),
    userController.updateUser
  )
  .delete(
    auth('admin'),
    validate(userValidation.deleteUser),
    userController.deleteUser
  )

export default router
