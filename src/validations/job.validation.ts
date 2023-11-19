import Joi from 'joi'

const idParamsValidation = Joi.object().keys({
  id: Joi.number().integer()
})

const createJob = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    remote: Joi.boolean().required(),
    paymentType: Joi.string().valid('FIXED', 'HOURLY', 'NEGOTIABLE').required(),
    jobType: Joi.string().valid('FREELANCE', 'FULL_TIME', 'COLLAB').required(),
    banner: Joi.string().allow(null).optional(),
    description: Joi.string().allow(null).optional(),
    publishDate: Joi.date().iso().allow(null).optional(),
    jobDetails: Joi.object().allow(null).optional(),
    country: Joi.string().allow(null).optional(),
    city: Joi.string().allow(null).optional(),
    paymentValue: Joi.number().optional(),
    expertise: Joi.string().valid('ENTRY', 'INTERMEDIATE', 'EXPERT').allow(null).optional(),
    jobSoftwares: Joi.array().items(Joi.string()).optional()
  })
}

const idValidation = {
  params: idParamsValidation
}

const updateJob = {
  params: idParamsValidation,
  body: Joi.object()
    .keys({
      title: Joi.string().optional().min(1),
      remote: Joi.boolean().optional(),
      paymentType: Joi.string().valid('FIXED', 'HOURLY', 'NEGOTIABLE').optional(),
      jobType: Joi.string().valid('FREELANCE', 'FULL_TIME', 'COLLAB').optional(),
      banner: Joi.string().allow(null).optional(),
      publishDate: Joi.date().iso().allow(null).optional(),
      jobDetails: Joi.object().allow(null).optional(),
      country: Joi.string().allow(null).optional(),
      city: Joi.string().allow(null).optional(),
      description: Joi.string().allow(null).optional(),
      paymentValue: Joi.number().optional(),
      expertise: Joi.string().valid('ENTRY', 'INTERMEDIATE', 'EXPERT').allow(null).optional(),
      jobSoftwares: Joi.array().items(Joi.string()).optional()
    })
    .min(1)
}

const updateApplication = {
  params: idParamsValidation,
  body: Joi.object().keys({
    jobId: Joi.number().integer().required(),
    resume: Joi.string().allow(null).optional(),
    motivationToApply: Joi.string().optional().min(1)
  })
}

const createApplication = {
  body: Joi.object().keys({
    jobId: Joi.number().integer().required(),
    resume: Joi.string().allow(null).optional(),
    motivationToApply: Joi.string().required()
  })
}

export default {
  idValidation,
  createJob,
  updateJob,
  createApplication,
  updateApplication
}
