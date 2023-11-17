import Joi from 'joi'

const idParamsValidation = Joi.object().keys({
  id: Joi.number().integer()
})

const paramValidation = {
  params: idParamsValidation
}

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    banner: Joi.string().allow('').optional(),
    matureContent: Joi.boolean().optional(),
    content: Joi.object().required(),
    postKeywords: Joi.array().items(Joi.string()).optional(),
    postSkills: Joi.array().items(Joi.string()).optional(),
    albumId: Joi.number().integer()
  })
}
const updatePost = {
  params: idParamsValidation,
  body: Joi.object()
    .keys({
      title: Joi.string().optional().min(1),
      description: Joi.string().allow('').optional(),
      banner: Joi.string().allow('').optional(),
      matureContent: Joi.boolean().optional(),
      content: Joi.object().optional().min(1),
      postKeywords: Joi.array().items(Joi.string()).optional(),
      postSkills: Joi.array().items(Joi.string()).optional(),
      albumId: Joi.number().integer()
    })
    .min(1)
}

const addComment = {
  params: idParamsValidation,
  body: Joi.object().keys({
    comment: Joi.string().required().min(1)
  })
}

export default {
  paramValidation,
  createPost,
  updatePost,
  addComment
}
