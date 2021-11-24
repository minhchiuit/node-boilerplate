import createError from 'http-errors'
import fetch from 'node-fetch'
import { google } from 'googleapis'

import config from '../config/config'
import * as userService from './user.service'

/**
 * Login user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email)
  if (user && (await user.isPasswordMatch(password))) return user
  throw new createError.Unauthorized('Incorrect email or password')
}

/**
 * Login with google
 * @param {string} tokenId
 * @returns {Promise<User>}
 */
const loginWithGoogle = async tokenId => {
  const { OAuth2 } = google.auth
  const client = new OAuth2(config.googleClient.id)
  // verify token
  const verify = await client.verifyIdToken({
    idToken: tokenId,
    audience: config.googleClient.id,
  })
  const { email_verified, email, given_name, family_name, picture } =
    verify.payload
  console.log({ verifyLoginWithGG: verify.payload })

  // failed verification
  if (!email_verified)
    return res
      .status(400)
      .json({ success: false, error: 'Email verification failed.' })

  // 1. if user exist/sign in
  const user = userService.getUserByEmail(email)
  if (user) return user

  //2. New user/create user
  const password = email + config.gSecret
  let newUser = {
    email,
    firstName: given_name,
    lastName: family_name,
    avatar: picture,
    password,
  }
  newUser = await userService.createUser(newUser)

  return newUser
}

/**
 * Login user with email and facebook
 * @param {string} accessToken
 * @param {string} userId
 * @returns {Promise<User>}
 */
const loginWithFacebook = async (accessToken, userId) => {
  const url = `https://graph.facebook.com/v4.0/${userId}?fields=id,name,email,picture&access_token=${accessToken}`
  const data = fetch(url)
    .then(res => res.json())
    .then(res => res)

  console.log(data)
  const { email, name, picture } = data

  // 1. if user exist/sign in
  const user = userService.getUserByEmail(email)
  if (user) return user

  //2. New user/create user
  const password = email + config.fbSecret
  let newUser = {
    email,
    firstName: name,
    lastName: name,
    avatar: picture,
    password,
  }
  newUser = await userService.createUser(newUser)

  return newUser
}

export { loginWithEmailAndPassword, loginWithGoogle, loginWithFacebook }
