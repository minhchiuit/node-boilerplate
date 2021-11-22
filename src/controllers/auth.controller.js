import createError from 'http-errors'
import catchAsync from '../utils/catchAsync'

import config from '../config/config'
import {
  userService,
  authService,
  tokenService,
  emailService,
} from '../services'
import sendMail from '../helpers/sendMail'
import createHttpError from 'http-errors'

/**
 * @POST api/register
 * @access public
 */
const register = catchAsync(async (req, res, next) => {
  const activation_token = await tokenService.generateActivationToken(req.body)
  await emailService.sendEmailRegister(req.body.email, activation_token)
  // registration success
  return res.status(200).json({
    success: true,
    message: 'Welcome! Please check your email.',
  })
})

/**
 * @POST api/auth/activation
 * @access public
 */
const activate = catchAsync(async (req, res, next) => {
  // verify token
  const newUser = await tokenService.verifyActivationToken(
    req.body.activation_token
  )
  // add user
  await userService.createUser(newUser)

  // activation success
  return res.status(200).json({
    success: true,
    message: 'Your account has been activated, you can now sign in.',
  })
})

/**
 * @POST api/signing
 * @access public
 */
const signing = catchAsync(async (req, res) => {
  // Get cred
  const { email, password } = req.body

  // Login
  const user = await authService.loginWithEmailAndPassword(email, password)

  // refresh token
  const rf_token = await tokenService.generateRefreshToken(user.id)

  // store refresh token
  res.cookie('_apprftoken', rf_token, config.jwt.cookie)

  res.status(200).json({ success: true, message: 'Signning success.' })
})

/**
 * @GET api/access-token
 * @access private
 */
const accessToken = catchAsync(async (req, res, next) => {
  //  rf_token
  const rf_token = req.signedCookies['_apprftoken']
  if (!rf_token) return next(createError.BadRequest('Please sign in.'))

  // verify token
  const { sub: userId } = await tokenService.verifyRefreshToken(rf_token)

  // create access token
  const ac_token = await tokenService.generateAccessToken(userId)

  // access success
  return res.status(200).json({ success: true, ac_token })
})

/**
 * @POST api/forgot-password
 * @access public
 */
const forgotPassword = catchAsync(async (req, res, next) => {
  // check email
  const user = await userService.getUserByEmail(req.body.email)
  if (!user) return next(createHttpError.NotFound('Email is not exists.'))

  const ac_token = await tokenService.generateAccessToken(user.id)

  // send email
  await emailService.sendEmailResetPassword(
    req.body.email,
    ac_token,
    user.fullName
  )

  // success
  res.status(200).json({
    success: true,
    message: 'Re-send the password, please check your email.',
  })
})

/**
 * @POST api/reset-password
 * @access public
 */
const resetPassword = catchAsync(async (req, res) => {
  await userService.updateUserById(req.user.id, req.body)
  // reset success
  res
    .status(200)
    .json({ success: true, message: 'Password was updated successfully.' })
})

/**
 * @GET api/info
 * @access private
 */
const info = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id)

  res.json({ success: true, user })
})

/**
 * @PATCH api/user-update
 * @access public
 */
const updateInfo = catchAsync(async (req, res, next) => {
  const userUpdated = await userService.updateUserById(req.user.id, req.body)
  res.status(200).json({ success: true, userUpdated })
})

/**
 * @GET api/singout
 * @access private
 */
const singout = catchAsync(async (req, res) => {
  // clear cookie
  res.clearCookie('_apprftoken', { path: '/api/auth/access' })
  // success
  res.status(200).json({ success: true, message: 'Signout success.' })
})

/**
 * @POST api/signing-google
 * @access public
 */
const loginWithGoogle = catchAsync(async (req, res) => {})

export default {
  register,
  activate,
  signing,
  accessToken,
  forgotPassword,
  resetPassword,
  info,
  updateInfo,
  singout,
  loginWithGoogle,
}
