import createError from 'http-errors'
import { transErrors } from '../../lang/en'
import userService from './user.service'

/**
 * Login user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email)
  if (user && (await user.isPasswordMatch(password))) return user
  throw new createError.Unauthorized(transErrors.login_failed)
}

export default { loginWithEmailAndPassword }
