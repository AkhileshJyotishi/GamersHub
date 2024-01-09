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
    description: Joi.string().optional()
  })
}
const updateNewsCategoryValidation = {
  params: idParamsValidation,
  body: Joi.object()
    .keys({
      title: Joi.string().optional().min(1),
      description: Joi.string().optional()
    })
    .min(1)
}
const newNewsValidation = {
  body: Joi.object().keys({
    categoryId: Joi.number().required(),
    title: Joi.string().optional(),
    subtitle: Joi.string().optional(),
    content: Joi.object().optional(),
    bannerImage: Joi.string().optional(),
    isSaved: Joi.bool().optional(),
    isPublished: Joi.bool().optional(),
    userId: Joi.number().required(),
    publishedAt: Joi.date().optional()
  })
}
const updateNewsValidation = {
  params: idParamsValidation,
  body: Joi.object()
    .keys({
      categoryId: Joi.number().required(),
      title: Joi.string().optional(),
      subtitle: Joi.string().optional(),
      content: Joi.object().optional(),
      bannerImage: Joi.string().optional(),
      isSaved: Joi.bool().optional(),
      isPublished: Joi.bool().optional(),
      publishedAt: Joi.date().optional(),
      userId: Joi.number().required()
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
