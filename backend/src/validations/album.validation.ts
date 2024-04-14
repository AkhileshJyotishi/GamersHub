import Joi from 'joi'

const idParamsValidation = Joi.object().keys({
  id: Joi.number().integer()
})

const paramsValidation = {
  params: idParamsValidation
}

const createAlbum = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    banner: Joi.string().allow('').optional(),
    keywords: Joi.array().items(Joi.string()).optional()
  })
}

const updateAlbumValidation = {
  params: idParamsValidation,
  body: Joi.object()
    .keys({
      title: Joi.string().optional().min(1),
      banner: Joi.string().optional(),
      keywords: Joi.array().items(Joi.string()).optional()
    })
    .min(1)
}

export default {
  paramsValidation,
  createAlbum,
  updateAlbumValidation
}
