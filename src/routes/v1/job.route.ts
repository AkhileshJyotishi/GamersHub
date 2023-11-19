import express from 'express'
import validate from '../../middlewares/validate'
import auth from '../../middlewares/auth'
import { jobController } from '../../controllers'
import { jobValidation } from '../../validations'

const router = express.Router()

router.get('/', jobController.getAllJobs)
router
  .route('/user')
  .get(auth(), jobController.getUserJobs)
  .post(auth(), validate(jobValidation.createJob), jobController.createUserJob)
  .delete(auth(), jobController.deleteUserJobs)

router.get('/others', auth(), jobController.getAllJobsExceptCurrentUser)

router.get('/user/saved', auth(), jobController.getSavedJobs)
router.post(
  '/user/save/:id',
  auth(),
  validate(jobValidation.idValidation),
  jobController.toggleSaveJob
)

router
  .route('/application')
  .get(auth(), jobController.getUserApplication)
  .post(auth(), validate(jobValidation.createApplication), jobController.createApplication)
  .delete(auth(), jobController.deleteApplication)

router
  .route('/application/:id')
  .get(auth(), validate(jobValidation.idValidation), jobController.getApplicationById)
  .patch(auth(), validate(jobValidation.updateApplication), jobController.updateApplicationById)
  .delete(auth(), validate(jobValidation.idValidation), jobController.deleteApplicationById)

router
  .route('/:id')
  .get(auth(), validate(jobValidation.idValidation), jobController.getJobById)
  .patch(auth(), validate(jobValidation.updateJob), jobController.updateJobById)
  .delete(auth(), validate(jobValidation.idValidation), jobController.deleteJobById)

export default router

// user details
// user skills nd software
// edu and exp
// social
