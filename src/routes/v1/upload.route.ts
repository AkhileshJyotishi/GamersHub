import express from 'express'
import { uploadController } from '../../controllers'
import auth from '../../middlewares/auth'
import formidable from 'express-formidable'
// import validate from '../../middlewares/validate'
// import { uploadValidation } from '../../validations'

const router = express.Router()

router.post(
  '/file',
  auth(),
  formidable(),
  //   validate(uploadValidation.createValidation),
  uploadController.uploadFile
)
router.post(
  '/multiple',
  auth(),
  formidable({ multiples: true }),
  // validate(uploadValidation.createValidation),
  uploadController.uploadFiles
)

export default router
