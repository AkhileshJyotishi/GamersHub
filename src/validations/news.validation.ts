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
    bannerImage: Joi.object().optional(),
    isSaved: Joi.bool().optional(),
    isPublished: Joi.bool().optional()
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
      bannerImage: Joi.object().optional(),
      isSaved: Joi.bool().optional(),
      isPublished: Joi.bool().optional()
    })
    .min(1)
    .custom((value, helpers) => {
      if (!value.isSaved && !value.isPublished) {
        return helpers.message({
          'any.required': 'At least one of isSaved or isPublished must be present'
        })
      }
      return value
    })
}
export default {
  paramsValidation,
  newNewsCategoryValidation,
  updateNewsCategoryValidation,
  newNewsValidation,
  updateNewsValidation
}
