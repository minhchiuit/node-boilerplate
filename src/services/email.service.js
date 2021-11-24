import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import config, { node_env } from '../config/config'
import logger from '../config/logger'

const { OAuth2 } = google.auth
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const { googleClient, adminEmail } = config

const oauth2Client = new OAuth2(
  googleClient.id,
  googleClient.secret,
  googleClient.refreshToken,
  OAUTH_PLAYGROUND
)

oauth2Client.setCredentials({ refresh_token: googleClient.refreshToken })
const accessToken = oauth2Client.getAccessToken()

// create stmp transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: adminEmail,
    clientId: googleClient.id,
    clientSecret: googleClient.secret,
    refreshToken: googleClient.refreshToken,
    accessToken,
  },
})

/* istanbul ignore next */
if (node_env !== 'test') {
  transporter
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn(
        'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
      )
    )
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {text|html} htmlContent
 */
const sendEmail = async (to, subject, htmlContent) => {
  let info = {
    from: adminEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  }
  await transporter.sendMail(info)
}

/**
 * Send email register
 * @param {string} to
 * @param {string} token
 */
const sendEmailRegister = async (to, token) => {
  const subject = 'ACTIVATE YOUR ACCOUNT'
  // replace this url with the link to the reset password page of your front-end app
  const url = `http://localhost:8888/api/auth/activate/${token}`
  const text = 'Verify your email'
  const htmlContent = `
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
              rel="stylesheet"
            />
            <title>Account Activation</title>
            <style>
              body {
                background-color: #333333;
                height: 100vh;
                font-family: "Roboto", sans-serif;
                color: #fff;
                position: relative;
                text-align: center;
              }
              .container {
                max-width: 700px;
                width: 100%;
                height: 100%;
                margin: 0 auto;
              }
              .wrapper {
                padding: 0 15px;
              }
              .card {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
              }
              span {
                color: #ffc107;
              }
              button {
                padding: 1em 6em;
                border-radius: 5px;
                border: 0;
                background-color: hsl(45, 100%, 51%);
                transition: all 0.3s ease-in;
                cursor: pointer;
              }
              button:hover {
                background-color: hsl(45, 70%, 51%);
                transition: all 0.3s ease-in;
              }
              .spacing {
                margin-top: 5rem;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="wrapper">
                <div class="card">
                  <h1><span>Welcome !</span> And thank you for registering !</h1>
                  <p>Please validate your email by clicking the button below 🙂</p>
                  <a href=${url}><button>${text}</button></a>
                  <p class="spacing">
                    If the button above does not work, please navigate to the link
                    provided below 👇🏻
                  </p>
                  <div>${url}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
    `

  await sendEmail(to, subject, htmlContent)
}

/**
 * Sen email reset password
 * @param {string} to
 * @param {string} token
 * @param {string} name
 */
const sendEmailResetPassword = async (to, token, name) => {
  const subject = 'RESET YOUR PASSWORD'
  // replace this url with the link to the reset password page of your front-end app
  const url = `http://localhost:3000/auth/reset-password/${token}`
  const text = 'Reset your password'
  const htmlContent = `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        />
        <title>Account Activation</title>
        <style>
          body {
            background-color: #333333;
            height: 100vh;
            font-family: "Roboto", sans-serif;
            color: #fff;
            position: relative;
            text-align: center;
          }
          .container {
            max-width: 700px;
            width: 100%;
            height: 100%;
            margin: 0 auto;
          }
          .wrapper {
            padding: 0 15px;
          }
          .card {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
          }
          span {
            color: #ffc107;
          }
          button {
            padding: 1em 6em;
            border-radius: 5px;
            border: 0;
            background-color: hsl(45, 100%, 51%);
            transition: all 0.3s ease-in;
            cursor: pointer;
          }
          button:hover {
            background-color: hsl(45, 70%, 51%);
            transition: all 0.3s ease-in;
          }
          .spacing {
            margin-top: 5rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="wrapper">
            <div class="card">
              <h1><span>Hey</span> ${name}</h1>
              <p>Please click the button below to reset your password. 🙂</p>
              <a href=${url}><button>${text}</button></a>
              <p class="spacing">
                If the button above does not work, please navigate to the link
                provided below 👇🏻
              </p>
              <div>${url}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  await sendEmail(to, subject, htmlContent)
}

export { sendEmail, sendEmailRegister, sendEmailResetPassword }
