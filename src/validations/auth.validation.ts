import Joi from 'joi'
import { password } from './custom.validation'

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    username: Joi.string().required(),
    role: Joi.string().valid('MOD', 'ADMIN').optional()
  })
}

const registerProvider = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    username: Joi.string().required(),
    isEmailVerified: Joi.boolean(),
    profileImage: Joi.string(),
    role: Joi.string().valid('MOD', 'ADMIN').optional()
  })
}

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
}

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
}

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
}

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required()
  })
}

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required()
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password)
  })
}

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required()
  })
}

const verificationEmail = {
  body: Joi.object().keys({
    email: Joi.string().email().required()
  })
}

const addProvider = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  }),
  body: Joi.object().keys({
    response: Joi.object(),
    providerType: Joi.string().required().valid('GOOGLE', 'FACEBOOK')
  })
}

export default {
  register,
  registerProvider,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  verificationEmail,
  addProvider
}
