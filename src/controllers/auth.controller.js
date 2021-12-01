import createHttpError from 'http-errors'
import catchAsync from '../utils/catchAsync'
import { tranSuccess, transErrors } from '../../lang/en'
import config from '../config/config'
import {
  userService,
  authService,
  tokenService,
  emailService,
} from '../services'

/**
 * Register user
 * @POST api/register
 * @access public
 */
const register = catchAsync(async (req, res, next) => {
  const activation_token = await tokenService.generateActivationToken(req.body)
  await emailService.sendEmailRegister(req.body.email, activation_token)
  // registration success
  return res.status(200).json({ message: tranSuccess.user_registered })
})

/**
 * Acitvation user
 * @POST api/auth/activation
 * @private public
 */
const activate = catchAsync(async (req, res, next) => {
  // verify token
  const newUser = await tokenService.verifyActivationToken(
    req.body.activation_token
  )
  // add user
  await userService.createUser(newUser)

  // activation success
  return res.status(200).json({ message: tranSuccess.account_actived })
})

/**
 * Login user
 * @POST api/login
 * @access public
 */
const login = catchAsync(async (req, res) => {
  // Get cred
  const { email, password } = req.body

  // Login
  const user = await authService.loginWithEmailAndPassword(email, password)

  // refresh token
  const rf_token = await tokenService.generateRefreshToken(user.id)

  // store refresh token
  res.cookie('_apprftoken', rf_token, config.jwt.cookie)

  res.status(200).json({ message: tranSuccess.login_success })
})

/**
 * Get access token
 * @GET api/access-token
 * @access private
 */
const accessToken = catchAsync(async (req, res, next) => {
  //  rf_token
  const rf_token = req.signedCookies['_apprftoken']
  if (!rf_token) return next(createHttpError.BadRequest('Please sign in.'))

  // verify token
  const { sub: userId } = await tokenService.verifyRefreshToken(rf_token)

  // create access token
  const ac_token = await tokenService.generateAccessToken(userId)

  // access success
  return res.status(200).json({ ac_token })
})

/**
 * Fotgot password
 * @POST api/forgot-password
 * @access public
 */
const forgotPassword = catchAsync(async (req, res, next) => {
  // check email
  const user = await userService.getUserByEmail(req.body.email)
  if (!user) return next(createHttpError.NotFound(transErrors.email_undefined))

  const ac_token = await tokenService.generateAccessToken(user.id)

  // send email
  await emailService.sendEmailResetPassword(
    req.body.email,
    ac_token,
    user.fullName
  )

  // success
  res.status(200).json({ message: tranSuccess.sendmail_reset_password_success })
})

/**
 * Reset password
 * @POST api/reset-password
 * @private public
 */
const resetPassword = catchAsync(async (req, res) => {
  await userService.updateUserPasswordById(req.user.id, req.body)
  // reset success
  res
    .status(200)
    .json({ success: true, message: 'Password was updated successfully.' })
})

/**
 * Logout user
 * @GET api/logout
 * @access private
 */
const logout = catchAsync(async (req, res) => {
  // clear cookie
  res.clearCookie('_apprftoken', { path: '/api/auth/access' })
  // success
  res.status(200).json({ message: tranSuccess.logout_success })
})

export default {
  register,
  activate,
  login,
  accessToken,
  forgotPassword,
  resetPassword,
  logout,
}
