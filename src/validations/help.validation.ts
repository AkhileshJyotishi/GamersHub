import Joi from 'joi'

const idParamsValidation = Joi.object().keys({
  id: Joi.number().integer()
})
const paramsValidation = {
  params: idParamsValidation
}

const newCategoryValidation = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    position: Joi.number().required(),
    order: Joi.array().items(Joi.number()).optional()
  })
}
const updateCategoryValidation = {
  params: idParamsValidation,
  body: Joi.object()
    .keys({
      title: Joi.string().optional().min(1),
      position: Joi.number().optional().min(1),
      order: Joi.array().items(Joi.number()).optional()
    })
    .min(1)
}
const newQuestionValidation = {
  body: Joi.object().keys({
    solution: Joi.string().allow(null),
    question: Joi.string().required(),
    categoryId: Joi.number().required()
  })
}
const updateQuestionValidation = {
  params: idParamsValidation,
  body: Joi.object()
    .keys({
      solution: Joi.string().allow(null),
      question: Joi.string().optional().min(1)
    })
    .min(1)
}
export default {
  paramsValidation,
  newCategoryValidation,
  updateCategoryValidation,
  newQuestionValidation,
  updateQuestionValidation
}
