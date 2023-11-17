import nodemailer from 'nodemailer'
import config from '../config/config'
import logger from '../config/logger'
import userService from './user.service'
import ApiError from '../utils/api-error'
import httpStatus from 'http-status'
import tokenService from './token.service'
import resetPasswordTemplate from '../templates/reset-password'
import verfiyEmailTemplate from '../templates/verify-email'
import gchWelcomeTemplate from '../templates/gch-welcome'

const transport = nodemailer.createTransport(config.email.smtp)
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
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
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to: string, subject: string, html: string) => {
  const msg = { from: config.email.from, to, subject, html }
  await transport.sendMail(msg)
}

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @param {string} username
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to: string, token: string, username: string) => {
  const subject = 'Reset password'
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${config.frontend.url}/reset-password?token=${token}`
  const html = resetPasswordTemplate(
    resetPasswordUrl,
    config.jwt.resetPasswordExpirationMinutes,
    username
  )
  await sendEmail(to, subject, html)
}

/**
 * Send verification email
 * @param {string} email
 * @returns {Promise}
 */
const sendVerificationEmail = async (email: string) => {
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  const token = await tokenService.generateVerifyEmailToken(user)
  const subject = 'Email Verification'
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${config.frontend.url}/verify-email?token=${token}`
  //   const text = `Dear user,
  // To verify your email, click on this link: ${verificationEmailUrl}`
  const html = verfiyEmailTemplate(verificationEmailUrl)
  await sendEmail(email, subject, html)
}

/**
 * Send welcome email
 * @param {string} email
 * @returns {Promise}
 */
const sendWelcomeEmail = async (email: string) => {
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  const subject = 'Welcome to GCH'
  const html = gchWelcomeTemplate(user.username)
  await sendEmail(email, subject, html)
}

export default {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendWelcomeEmail
}
