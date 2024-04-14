import httpStatus from 'http-status'
import tokenService from './token.service'
import userService from './user.service'
import ApiError from '../utils/api-error'
import { ProviderType, TokenType, User } from '@prisma/client'
import prisma from '../client'
import { encryptPassword, isPasswordMatch } from '../utils/encryption'
import { AuthTokensResponse } from '../types/response'
import exclude from '../utils/exclude'

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Omit<User, 'password'>>}
 */
const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<Omit<User, 'password' | 'validUser'>> => {
  const user = await userService.getUserByEmail(email, [
    'id',
    'email',
    'username',
    'password',
    'isEmailVerified',
    'createdAt',
    'updatedAt',
    'profileImage',
    'bannerImage',
    'matureContent',
    'validUser'
  ])

  if (user) {
    const provider = await prisma.provider.findUnique({
      where: {
        userId: user.id
      }
    })
    if (provider) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'User registered through 3rd party auth')
    }
  }
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User does not exist')
  }
  if (!(await isPasswordMatch(password, user.password as string))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
  }
  await isUserValid(user.id)
  return exclude(user, ['password', 'validUser'])
}
/**
 * Admin Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Omit<User, 'password'>>}
 */
const adminloginUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<Omit<User, 'password' | 'validUser'>> => {
  const user = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      role: true
    }
  })
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User does not exist')
  }
  if (!(await isPasswordMatch(password, user.password as string))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
  }
  if (user.role?.role != 'ADMIN') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Permission not Granted')
  }
  await isUserValid(user.id)
  return exclude(user, ['password', 'validUser'])
}

/**
 * Logout
 * @param {string} accessToken
 * @returns {Promise<void>}
 */
const logout = async (accessToken: string): Promise<void> => {
  const accessTokenData = await prisma.token.findFirst({
    where: {
      token: accessToken,
      type: TokenType.ACCESS,
      blacklisted: false
    }
  })
  if (!accessTokenData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
  }
  // delete both refresh and access token associated with the user
  await prisma.token.deleteMany({ where: { userId: accessTokenData.userId } })
}

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<AuthTokensResponse>}
 */
const refreshAuth = async (refreshToken: string): Promise<AuthTokensResponse> => {
  try {
    const refreshTokenData = await tokenService.verifyToken(refreshToken, TokenType.REFRESH)
    const { userId } = refreshTokenData
    return tokenService.generateAuthTokens({ id: userId })
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
  }
}

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
const resetPassword = async (resetPasswordToken: string, newPassword: string): Promise<void> => {
  try {
    const resetPasswordTokenData = await tokenService.verifyToken(
      resetPasswordToken,
      TokenType.RESET_PASSWORD
    )
    const user = await userService.getUserById(resetPasswordTokenData.userId)
    if (!user) {
      throw new Error()
    }
    const encryptedPassword = await encryptPassword(newPassword)
    await userService.updateUserById(user.id, { password: encryptedPassword })
    await prisma.token.deleteMany({ where: { userId: user.id, type: TokenType.RESET_PASSWORD } })
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed')
  }
}

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise<void>}
 */
const verifyEmail = async (verifyEmailToken: string): Promise<void> => {
  try {
    const verifyEmailTokenData = await tokenService.verifyToken(
      verifyEmailToken,
      TokenType.VERIFY_EMAIL
    )
    await prisma.token.deleteMany({
      where: { userId: verifyEmailTokenData.userId, type: TokenType.VERIFY_EMAIL }
    })
    await userService.updateUserById(verifyEmailTokenData.userId, { isEmailVerified: true })
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed')
  }
}

const addProvider = async (
  userId: number,
  response: object,
  providerType: ProviderType
): Promise<void> => {
  try {
    await prisma.provider.upsert({
      where: {
        userId
      },
      update: {
        data: response,
        providerType
      },
      create: {
        data: response,
        providerType,
        userId
      }
    })
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Provider creation failed')
  }
}

/**
 * Valid User
 * @param {number} userId
 * @returns {Promise<void>}
 */
const isUserValid = async (userId: number): Promise<void> => {
  const verifiedUser = await prisma.user.findUnique({
    where: {
      id: userId,
      isEmailVerified: true
    }
  })
  if (!verifiedUser) {
    throw new ApiError(httpStatus.NETWORK_AUTHENTICATION_REQUIRED, 'Email not verified.')
  }
  const validUser = await prisma.user.findUnique({
    where: {
      id: userId,
      validUser: true
    }
  })
  if (!validUser) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Blocked Access.')
  }
}

export default {
  loginUserWithEmailAndPassword,
  adminloginUserWithEmailAndPassword,
  isPasswordMatch,
  encryptPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  addProvider,
  isUserValid
}
