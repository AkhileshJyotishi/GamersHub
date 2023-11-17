import Joi from 'joi'

const blacklistUserById = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
}

const blacklistUserByEmail = {
  body: Joi.object().keys({
    email: Joi.string().email()
  })
}

export default {
  blacklistUserById,
  blacklistUserByEmail
}
