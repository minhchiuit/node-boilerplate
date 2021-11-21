import { Router } from 'express'
import userController from '../controllers/user.controller'
const router = new Router()
import validate from '../middlewares/validate'
import { register } from '../validations/auth.validation'

router
  .route('/')
  .post(validate(register), userController.createUser)
  .get(userController.getUsers)

router
  .route('/:userId')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

export default router
