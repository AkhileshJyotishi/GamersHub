import Joi from 'joi'

const idParamsValidation = Joi.object().keys({
  id: Joi.number().integer()
})

const queryJobs = {
  query: Joi.object().keys({
    expertise: Joi.array().items(Joi.string().valid('ENTRY', 'EXPERT', 'INTERMEDIATE')),
    jobType: Joi.array().items(Joi.string().valid('FREELANCE', 'FULL_TIME', 'COLLAB')),
    remote: Joi.boolean(),
    jobSoftwares: Joi.array().items(Joi.string()),
    rolesNeeded: Joi.array().items(Joi.string())
  })
}

const queryJobResponses = {
  query: Joi.object().keys({
    country: Joi.string(),
    userSkills: Joi.array().items(Joi.string()),
    userSoftwares: Joi.array().items(Joi.string()),
    rolesApplied: Joi.array().items(Joi.string())
  })
}

const getJobResponseValidation = {
  params: idParamsValidation,
  query: queryJobResponses.query
}

const createJob = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    remote: Joi.boolean().required(),
    paymentType: Joi.string().valid('FIXED', 'HOURLY', 'NEGOTIABLE').required(),
    jobType: Joi.string().valid('FREELANCE', 'FULL_TIME', 'COLLAB').required(),
    description: Joi.string().allow('').optional(),
    jobApplyUrl: Joi.string().allow('').optional(),
    publishDate: Joi.date().iso().allow('').optional(),
    jobDetails: Joi.object().allow({}).optional(),
    aboutRecruiter: Joi.object().allow({}).optional(),
    country: Joi.string().allow('').optional(),
    city: Joi.string().allow('').optional(),
    paymentValue: Joi.number().optional(),
    expertise: Joi.string().valid('ENTRY', 'INTERMEDIATE', 'EXPERT').allow(null).optional(),
    jobSoftwares: Joi.array().items(Joi.string()).optional(),
    rolesNeeded: Joi.array().items(Joi.string()).optional()
  })
}

const idValidation = {
  params: idParamsValidation
}
const myJobsValidation = {
  params: idParamsValidation,
  query: Joi.object().keys({
    expertise: Joi.array().items(Joi.string().valid('ENTRY', 'EXPERT', 'INTERMEDIATE')),
    jobType: Joi.array().items(Joi.string().valid('FREELANCE', 'FULL_TIME', 'COLLAB')),
    remote: Joi.boolean(),
    jobSoftwares: Joi.array().items(Joi.string())
  })
}

const updateJob = {
  params: idParamsValidation,
  body: Joi.object()
    .keys({
      title: Joi.string().optional().min(1),
      remote: Joi.boolean().optional(),
      paymentType: Joi.string().valid('FIXED', 'HOURLY', 'NEGOTIABLE').optional(),
      jobType: Joi.string().valid('FREELANCE', 'FULL_TIME', 'COLLAB').optional(),
      publishDate: Joi.date().iso().allow('').optional(),
      jobDetails: Joi.object().allow({}).optional(),
      jobApplyUrl: Joi.string().allow('').optional(),
      aboutRecruiter: Joi.object().allow({}).optional(),
      country: Joi.string().allow('').optional(),
      city: Joi.string().allow('').optional(),
      description: Joi.string().allow('').optional(),
      paymentValue: Joi.number().optional(),
      expertise: Joi.string().valid('ENTRY', 'INTERMEDIATE', 'EXPERT').allow(null).optional(),
      jobSoftwares: Joi.array().items(Joi.string()).optional(),
      rolesNeeded: Joi.array().items(Joi.string()).optional()
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
    rolesApplied: Joi.array().items(Joi.string()).optional(),
    applyMethod: Joi.string().valid('MANUAL', 'GCH').optional(),
    resume: Joi.string().allow('').optional(),
    motivationToApply: Joi.string().required(),
    firstName: Joi.string().optional().min(1),
    lastName: Joi.string().optional().allow(''),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional().allow(''),
    country: Joi.string().optional().allow(''),
    city: Joi.string().optional().allow(''),
    bio: Joi.string().optional().allow(''),
    portfolio: Joi.string().optional().allow(''),
    skills: Joi.array().items(Joi.string()).optional()
  })
}

export default {
  idValidation,
  queryJobs,
  createJob,
  myJobsValidation,
  updateJob,
  createApplication,
  updateApplication,
  getJobResponseValidation
}
