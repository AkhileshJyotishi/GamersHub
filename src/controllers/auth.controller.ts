import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'
import { authService, userService, tokenService, emailService } from '../services'
import exclude from '../utils/exclude'
import { sendResponse } from '../utils/response'

const register = catchAsync(async (req, res) => {
  const { email, password, username, role } = req.body
  const user = await userService.createUser(email, password, username, role)
  const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt'])
  sendResponse(
    res,
    httpStatus.CREATED,
    null,
    { user: userWithoutPassword },
    'User created successfully'
  )
})

const registerProvider = catchAsync(async (req, res) => {
  const { email, username, isEmailVerified, profileImage, role } = req.body
  const existingUser = await userService.getUserByEmail(email)
  if (existingUser) {
    await authService.isUserValid(existingUser.id)
    const tokens = await tokenService.generateAuthTokens(existingUser)
    const userWithoutPassword = exclude(existingUser, ['password', 'createdAt', 'updatedAt'])
    sendResponse(
      res,
      httpStatus.OK,
      null,
      { user: userWithoutPassword, token: tokens },
      'User logged in successfully'
    )
  } else {
    const user = await userService.createProviderUser(
      email,
      username,
      isEmailVerified,
      profileImage,
      role
    )
    const tokens = await tokenService.generateAuthTokens(user)
    const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt'])
    sendResponse(
      res,
      httpStatus.CREATED,
      null,
      { user: userWithoutPassword, token: tokens },
      'User registered successfully'
    )
  }
})

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const user = await authService.loginUserWithEmailAndPassword(email, password)
  const tokens = await tokenService.generateAuthTokens(user)
  sendResponse(res, httpStatus.OK, null, { user, tokens }, 'User logged in successfully')
})

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken)
  sendResponse(res, httpStatus.OK, null, null, 'User logged out successfully')
})

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken)
  sendResponse(res, httpStatus.OK, null, { ...tokens }, 'Success')
})

const forgotPassword = catchAsync(async (req, res) => {
  const { resetPasswordToken, username } = await tokenService.generateResetPasswordToken(
    req.body.email
  )
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken, username)
  sendResponse(res, httpStatus.OK, null, null, 'Mail sent successfully')
})

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token as string, req.body.password)
  sendResponse(res, httpStatus.OK, null, null, 'Password reset successfull')
})

const sendVerificationEmail = catchAsync(async (req, res) => {
  const { email } = req.body
  await emailService.sendVerificationEmail(email)
  sendResponse(res, httpStatus.OK, null, null, 'Mail sent successfully')
})

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token as string)
  sendResponse(res, httpStatus.OK, null, null, 'Email Verified successfully')
})

const addProvider = catchAsync(async (req, res) => {
  const { response, providerType, userId } = req.body
  // const { userId } = req.params
  await authService.addProvider(userId, response, providerType)
  sendResponse(res, httpStatus.CREATED, null, null, 'success')
})

export default {
  register,
  registerProvider,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  addProvider
}
