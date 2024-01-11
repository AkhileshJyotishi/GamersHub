import express from 'express'
import validate from '../../middlewares/validate'
import auth from '../../middlewares/auth'
import { jobController } from '../../controllers'
import { jobValidation } from '../../validations'

const router = express.Router()

router.get('/', validate(jobValidation.queryJobs), jobController.getAllJobs)

router
  .route('/user')
  .post(auth(), validate(jobValidation.createJob), jobController.createUserJob)
  .delete(auth(), jobController.deleteUserJobs)

router.get(
  '/others',
  auth(),
  validate(jobValidation.queryJobs),
  jobController.getAllJobsExceptCurrentUser
)

router.get('/user/saved', auth(), jobController.getSavedJobs)
router.post(
  '/user/save/:id',
  auth(),
  validate(jobValidation.idValidation),
  jobController.toggleSaveJob
)

router
  .route('/application')
  .post(auth(), validate(jobValidation.createApplication), jobController.createApplication)
  .delete(auth(), jobController.deleteApplication)

router.get(
  '/applications/:id',
  validate(jobValidation.idValidation),
  jobController.getUserApplication
)

router
  .route('/application/:id')
  .get(validate(jobValidation.idValidation), jobController.getApplicationById)
  .patch(auth(), validate(jobValidation.updateApplication), jobController.updateApplicationById)
  .delete(auth(), validate(jobValidation.idValidation), jobController.deleteApplicationById)

router.get('/user/:id', validate(jobValidation.myJobsValidation), jobController.getUserJobs)
router
  .route('/:id')
  .get(validate(jobValidation.idValidation), jobController.getJobById)
  .patch(auth(), validate(jobValidation.updateJob), jobController.updateJobById)
  .delete(auth(), validate(jobValidation.idValidation), jobController.deleteJobById)

export default router

// user details
// user skills nd software
// edu and exp
// social
