import dotenv from 'dotenv'
dotenv.config()

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

  //cloud
  CLOUD_NAME: cloudName,
  CLOUD_API_KEY: cloudApiKey,
  CLOUD_API_SECRET: cloudApiSecret,

  // smtp
  SMTP_HOST: smtpHost,
  SMTP_PORT: smtpPort,
  SMTP_USERNAME: smtpUsername,
  SMTP_PASSWORD: smtpPassword,
  EMAIL_FROM: emailFrom,
} = process.env

const config = {
  env: node_env,
  port: app_port,
  mongodbUrl: mongodb_url,
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
  cloudinaryV2: {
    config: {
      cloud_name: cloudName,
      api_key: cloudApiKey,
      api_secret: cloudApiSecret,
    },
  },

  email: {
    smtp: {
      host: smtpHost,
      port: smtpPort,
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtpUsername, // generated ethereal user
        pass: smtpPassword, // generated ethereal password
      },
    },
    from: emailFrom,
  },
  app: {
    max_event_listeners: 30,
    upload_directory: 'src/uploads',
    upload_limit_size: 1048576, // 1048576 byte = 1MB
    image_types: ['image/jpg', 'image/png', 'image/jpeg'],
  },
}
export default config
