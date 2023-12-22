import Joi from 'joi'

const createValidation = {
  body: Joi.object().keys({
    type: Joi.string().required()
  })
}

export default {
  createValidation
}
