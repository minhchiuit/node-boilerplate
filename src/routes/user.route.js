import { Router } from 'express'
const router = new Router()
import validate from '../middlewares/validate'
import { authValidation } from '../validations'
import { auth } from '../middlewares/auth'
import { userController } from '../controllers'

router
  .route('/')
  .post(
    auth('admin'),
    validate(authValidation.register),
    userController.createUser
  )
  .get(auth('admin'), userController.getUsers)

router
  .route('/:userId')
  .get(userController.getUser)
  .patch(auth('admin'), userController.updateUser)
  .delete(auth('admin'), userController.deleteUser)

export default router
