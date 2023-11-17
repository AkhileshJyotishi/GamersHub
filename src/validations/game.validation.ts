import Joi from 'joi'

const idParamsValidation = Joi.object().keys({
  id: Joi.number().integer()
})

const idValidation = {
  params: idParamsValidation
}

const createGame = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.object().optional(),
    banner: Joi.string().allow(null).optional(),
    gameMode: Joi.string().valid('singlePlayer', 'multiPlayer').optional(),
    developerName: Joi.string().allow('').optional(),
    developerType: Joi.string().valid('indie', 'studio', 'collaboration').optional(),
    releaseDate: Joi.date().iso().allow(null).optional(),
    genre: Joi.array().items(Joi.string()).optional(),
    distributionPlatforms: Joi.array().items(Joi.string()).optional(),
    platforms: Joi.array().items(Joi.string()).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    gameGallery: Joi.array().items(Joi.string()).optional()
  })
}

const updateGame = {
  params: idParamsValidation,
  body: Joi.object()
    .keys({
      title: Joi.string().optional().min(1),
      description: Joi.object().optional(),
      banner: Joi.string().allow(null).optional(),
      gameMode: Joi.string().valid('singlePlayer', 'multiPlayer').optional(),
      developerName: Joi.string().allow('').optional(),
      developerType: Joi.string().valid('indie', 'studio', 'collaboration').optional(),
      releaseDate: Joi.date().iso().allow(null).optional(),
      genre: Joi.array().items(Joi.string()).optional(),
      distributionPlatforms: Joi.array().items(Joi.string()).optional(),
      platforms: Joi.array().items(Joi.string()).optional(),
      tags: Joi.array().items(Joi.string()).optional(),
      gameGallery: Joi.array().items(Joi.string()).optional()
    })
    .min(1)
}

export default {
  idValidation,
  createGame,
  updateGame
}
