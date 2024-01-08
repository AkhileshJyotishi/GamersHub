import Joi from 'joi'

const idParamsValidation = Joi.object().keys({
  id: Joi.number().integer()
})

const queryJobs = {
  query: Joi.object().keys({
    expertise: Joi.array().items(Joi.string().valid('ENTRY', 'EXPERT', 'INTERMEDIATE')),
    jobType: Joi.string().valid('FREELANCE', 'FULL_TIME', 'COLLAB'),
    remote: Joi.boolean(),
    jobSoftwares: Joi.array().items(Joi.string())
  })
}

const createJob = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    remote: Joi.boolean().required(),
    paymentType: Joi.string().valid('FIXED', 'HOURLY', 'NEGOTIABLE').required(),
    jobType: Joi.string().valid('FREELANCE', 'FULL_TIME', 'COLLAB').required(),
    banner: Joi.string().allow('').optional(),
    description: Joi.string().allow('').optional(),
    publishDate: Joi.date().iso().allow('').optional(),
    jobDetails: Joi.object().allow({}).optional(),
    aboutRecruiter: Joi.object().allow({}).optional(),
    country: Joi.string().allow('').optional(),
    city: Joi.string().allow('').optional(),
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
      banner: Joi.string().allow('').optional(),
      publishDate: Joi.date().iso().allow('').optional(),
      jobDetails: Joi.object().allow({}).optional(),
      aboutRecruiter: Joi.object().allow({}).optional(),
      country: Joi.string().allow('').optional(),
      city: Joi.string().allow('').optional(),
      description: Joi.string().allow('').optional(),
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
    resume: Joi.string().allow('').optional(),
    motivationToApply: Joi.string().optional().min(1)
  })
}

const createApplication = {
  body: Joi.object().keys({
    jobId: Joi.number().integer().required(),
    resume: Joi.string().allow('').optional(),
    motivationToApply: Joi.string().required()
  })
}

export default {
  idValidation,
  queryJobs,
  createJob,
  updateJob,
  createApplication,
  updateApplication
}
