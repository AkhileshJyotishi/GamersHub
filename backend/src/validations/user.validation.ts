import Joi from 'joi'
import { password } from './custom.validation'

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    username: Joi.string().required(),
    role: Joi.string()
  })
}

const getUsers = {
  query: Joi.object().keys({
    username: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
}
const queryUsers = {
  query: Joi.object().keys({
    country: Joi.string(),
    userSkills: Joi.array().items(Joi.string()),
    userSoftwares: Joi.array().items(Joi.string())
  })
}

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      profileImage: Joi.string().allow('').optional(),
      bannerImage: Joi.string().allow('').optional(),
      matureContent: Joi.boolean().optional()
    })
    .min(1)
}

const createSocials = {
  body: Joi.object()
    .keys({
      twitter: Joi.string().optional().allow(''),
      facebook: Joi.string().optional().allow(''),
      linkedin: Joi.string().optional().allow(''),
      youtube: Joi.string().optional().allow(''),
      github: Joi.string().optional().allow(''),
      portfolio: Joi.string().optional().allow(''),
      artstation: Joi.string().optional().allow('')
    })
    .min(1)
}

const updateSocials = {
  body: Joi.object()
    .keys({
      twitter: Joi.string().optional().allow(''),
      facebook: Joi.string().optional().allow(''),
      linkedin: Joi.string().optional().allow(''),
      youtube: Joi.string().optional().allow(''),
      github: Joi.string().optional().allow(''),
      portfolio: Joi.string().optional().allow(''),
      artstation: Joi.string().optional().allow('')
    })
    .min(1)
}

const createEducation = {
  body: Joi.object().keys({
    university: Joi.string().required(),
    degree: Joi.string().required(),
    startingDate: Joi.date().iso().required(),
    endingDate: Joi.date().iso().allow(null).optional(),
    description: Joi.string().allow('').optional()
  })
}

const updateEducation = {
  params: Joi.object().keys({
    id: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      university: Joi.string().optional().min(1),
      degree: Joi.string().optional().min(1),
      startingDate: Joi.date().iso().optional().min(1),
      endingDate: Joi.date().iso().allow(null).optional(),
      description: Joi.string().allow('').optional()
    })
    .min(1)
}

const deleteEducation = {
  params: Joi.object().keys({
    id: Joi.number().integer()
  })
}

const createExperience = {
  body: Joi.object().keys({
    role: Joi.string().required(),
    company: Joi.string().required(),
    presentWorking: Joi.boolean().optional(),
    startingDate: Joi.date().iso().required(),
    endingDate: Joi.date().iso().allow(null).optional(),
    description: Joi.string().allow('').optional()
  })
}

const updateExperience = {
  params: Joi.object().keys({
    id: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      role: Joi.string().optional().min(1),
      company: Joi.string().optional().min(1),
      presentWorking: Joi.boolean().optional(),
      startingDate: Joi.date().iso().optional().min(1),
      endingDate: Joi.date().iso().allow(null).optional(),
      description: Joi.string().allow('').optional()
    })
    .min(1)
}

const deleteExperience = {
  params: Joi.object().keys({
    id: Joi.number().integer()
  })
}

const createUserDetails = {
  body: Joi.object().keys({
    country: Joi.string().allow('').optional(),
    city: Joi.string().allow('').optional(),
    resume: Joi.string().allow('').optional(),
    userBio: Joi.string().allow('').optional(),
    userSkills: Joi.array().items(Joi.string()).optional(),
    userSoftwares: Joi.array().items(Joi.string()).optional(),
    profileImage: Joi.string().allow('').optional()
  })
}

const updateUserDetails = {
  body: Joi.object()
    .keys({
      country: Joi.string().allow('').optional(),
      city: Joi.string().allow('').optional(),
      resume: Joi.string().allow('').optional(),
      userBio: Joi.string().allow('').optional(),
      userSkills: Joi.array().items(Joi.string()).optional(),
      userSoftwares: Joi.array().items(Joi.string()).optional(),
      profileImage: Joi.string().allow('').optional()
    })
    .min(1)
}

const getCustomDetails = {
  params: Joi.object().keys({
    id: Joi.number().integer()
  })
}

export default {
  createUser,
  getUsers,
  updateUser,
  queryUsers,
  createSocials,
  updateSocials,
  createEducation,
  updateEducation,
  deleteEducation,
  createExperience,
  updateExperience,
  deleteExperience,
  createUserDetails,
  updateUserDetails,
  getCustomDetails
}
