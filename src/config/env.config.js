export const {
  // app
  NODE_ENV: node_env,
  PORT: app_port,
  MONGODB_URL: mongodb_url,

  // jwt
  JWT_ACCESS_SECRET: accessSecret,
  JWT_ACCESS_EXPIRATION: accessExpiration,

  JWT_REFRESH_SECRET: refreshSecret,
  JWT_REFRESH_EXPIRATION: refreshExpiration,

  JWT_ACTIVATE_SECRET: activateSecret,
  JWT_ACTIVATE_EXPIRATION: activateExpiration,

  JWT_RESET_PASSWORD_SECRET: resetPasswordSecret,
  JWT_RESET_PASSWORD_EXPIRATION: resetPasswordExpiration,

  //
} = process.env

const config = {
  jwt: {
    secret: {
      access: accessSecret,
      refresh: refreshSecret,
      activate: activateSecret,
      resetPassword: resetPasswordSecret,
    },
    expiration: {
      access: accessExpiration,
      refresh: refreshExpiration,
      activate: activateExpiration,
      resetPassword: resetPasswordExpiration,
    },
    options: {
      audience: 'https://example.io',
      expiresIn: '12h', // 1d
      issuer: 'example.io',
    },
    cookie: {
      path: '/api/auth/access',
      maxAge: 1000,
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: true,
    },
  },
}
export default config
