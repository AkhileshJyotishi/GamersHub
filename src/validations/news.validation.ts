import Joi from 'joi'

const idParamsValidation = Joi.object().keys({
  id: Joi.number().integer()
})
const paramsValidation = {
  params: idParamsValidation
}

const newNewsCategoryValidation = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().allow('').optional()
  })
}
const updateNewsCategoryValidation = {
  params: idParamsValidation,
  body: Joi.object()
    .keys({
      title: Joi.string().min(1).optional(),
      description: Joi.string().allow('').optional()
    })
    .min(1)
}
const newNewsValidation = {
  body: Joi.object().keys({
    categoryId: Joi.number().required(),
    title: Joi.string().optional(),
    subtitle: Joi.string().allow('').optional(),
    content: Joi.object().optional(),
    bannerImage: Joi.string().allow('').optional(),
    isSaved: Joi.bool().optional(),
    isPublished: Joi.bool().optional(),
    publishedAt: Joi.date().iso().allow('').optional()
  })
}

const updateNewsValidation = {
  params: idParamsValidation,
  body: Joi.object()
    .keys({
      title: Joi.string().min(1).optional(),
      subtitle: Joi.string().allow('').optional(),
      content: Joi.object().optional(),
      bannerImage: Joi.string().optional(),
      isSaved: Joi.bool().optional(),
      isPublished: Joi.bool().optional(),
      publishedAt: Joi.date().iso().allow('').optional()
    })
    .min(1)
}
export default {
  paramsValidation,
  newNewsCategoryValidation,
  updateNewsCategoryValidation,
  newNewsValidation,
  updateNewsValidation
}
