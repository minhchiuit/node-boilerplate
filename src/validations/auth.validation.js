import * as yup from 'yup'
import config from './config.validation.js'

const register = {
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup
    .string()
    .matches(
      config.regexPassword,
      'Password must contain at least 1 letter and 1 number, and at least 6 or more characters'
    )
    .required(),
}

const activate = {
  activation_token: yup.string().required(),
}

const signing = {
  email: yup.string().required(),
  password: yup
    .string()
    .matches(
      config.regexPassword,
      'Password must contain at least 1 letter and 1 number, and at least 6 or more characters'
    )
    .required(),
}

const forgotPassword = {
  email: yup.string().email().required(),
}

const resetPassword = {
  password: yup
    .string()
    .matches(
      config.regexPassword,
      'Password must contain at least 1 letter and 1 number, and at least 6 or more characters'
    )
    .required(),
}

const updateInfo = {
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(),
  checkbox_selection: yup.string().when(['firstName', 'lastName', 'email'], {
    is: (firstName, lastName, email) => !firstName && !lastName && !email,
    then: yup.string().required('At least one checkbox is to be selected'),
    otherwise: yup.string(),
  }),
}

const singout = {
  refreshToken: yup.string().required(),
}

export {
  register,
  activate,
  signing,
  forgotPassword,
  resetPassword,
  updateInfo,
  updateAvatar,
  singout,
}
