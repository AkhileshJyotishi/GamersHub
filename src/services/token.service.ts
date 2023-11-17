import jwt from 'jsonwebtoken'
import moment, { Moment } from 'moment'
import httpStatus from 'http-status'
import config from '../config/config'
import userService from './user.service'
import ApiError from '../utils/api-error'
import { Token, TokenType } from '@prisma/client'
import prisma from '../client'
import { AuthTokensResponse } from '../types/response'

/**
 * Generate token
 * @param {number} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (
  userId: number,
  expires: Moment,
  type: TokenType,
  secret = config.jwt.secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  }
  return jwt.sign(payload, secret)
}

/**
 * Save a token
 * @param {string} token
 * @param {number} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (
  token: string,
  userId: number,
  expires: Moment,
  type: TokenType,
  blacklisted = false
): Promise<Token> => {
  const createdToken = prisma.token.create({
    data: {
      token,
      userId: userId,
      expires: expires.toDate(),
      type,
      blacklisted
    }
  })
  return createdToken
}

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token: string, type: TokenType): Promise<Token> => {
  const payload = jwt.verify(token, config.jwt.secret)
  const userId = Number(payload.sub)
  const tokenData = await prisma.token.findFirst({
    where: { token, type, userId, blacklisted: false }
  })
  if (!tokenData) {
    throw new Error('Token not found')
  }
  return tokenData
}

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<AuthTokensResponse>}
 */
const generateAuthTokens = async (user: { id: number }): Promise<AuthTokensResponse> => {
  await deleteAuthTokens(user)

  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minute')
  const accessToken = generateToken(user.id, accessTokenExpires, TokenType.ACCESS)
  await saveToken(accessToken, user.id, accessTokenExpires, TokenType.ACCESS)

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days')
  const refreshToken = generateToken(user.id, refreshTokenExpires, TokenType.REFRESH)
  await saveToken(refreshToken, user.id, refreshTokenExpires, TokenType.REFRESH)

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  }
}

interface resetPasswordResponse {
  resetPasswordToken: string
  username: string
}

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email: string): Promise<resetPasswordResponse> => {
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email')
  }
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes')
  const resetPasswordToken = generateToken(user.id as number, expires, TokenType.RESET_PASSWORD)
  await deleteResetPasswordToken(user)
  await saveToken(resetPasswordToken, user.id as number, expires, TokenType.RESET_PASSWORD)
  const username = user.username
  return { resetPasswordToken, username }
}

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user: { id: number }): Promise<string> => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes')
  const verifyEmailToken = generateToken(user.id, expires, TokenType.VERIFY_EMAIL)
  await deleteVerifyEmailToken(user)
  await saveToken(verifyEmailToken, user.id, expires, TokenType.VERIFY_EMAIL)
  return verifyEmailToken
}

/**
 * Delete Auth Tokens
 * @param {User} user
 * @returns {Promise<void>}
 */
const deleteAuthTokens = async (user: { id: number }): Promise<void> => {
  const tokens = await prisma.token.findMany({
    where: {
      userId: user.id,
      type: {
        in: ['ACCESS', 'REFRESH']
      }
    }
  })
  if (tokens) {
    await prisma.token.deleteMany({
      where: {
        userId: user.id,
        type: {
          in: ['ACCESS', 'REFRESH']
        }
      }
    })
  }
}

/**
 * Delete Refresh Tokens
 * @param {User} user
 * @returns {Promise<void>}
 */
const deleteResetPasswordToken = async (user: { id: number }): Promise<void> => {
  const tokens = await prisma.token.findFirst({
    where: {
      userId: user.id,
      type: TokenType.RESET_PASSWORD
    }
  })
  if (tokens) {
    await prisma.token.deleteMany({
      where: {
        userId: user.id,
        type: TokenType.RESET_PASSWORD
      }
    })
  }
}

/**
 * Delete Verify E-mail Tokens
 * @param {User} user
 * @returns {Promise<void>}
 */
const deleteVerifyEmailToken = async (user: { id: number }): Promise<void> => {
  const tokens = await prisma.token.findFirst({
    where: {
      userId: user.id,
      type: TokenType.VERIFY_EMAIL
    }
  })
  if (tokens) {
    await prisma.token.deleteMany({
      where: {
        userId: user.id,
        type: TokenType.VERIFY_EMAIL
      }
    })
  }
}

export default {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
  deleteAuthTokens,
  deleteResetPasswordToken,
  deleteVerifyEmailToken
}
