import Joi from 'joi'

const blacklistUserById = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
}
const idParamsValidation = Joi.object().keys({
  userId: Joi.number().integer()
})
const paramsValidation = {
  params: idParamsValidation
}

const userEmailValidation = {
  body: Joi.object().keys({
    email: Joi.string().email()
  })
}

export default {
  paramsValidation,
  blacklistUserById,
  userEmailValidation
}
