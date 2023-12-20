import express from 'express'
import { uploadController } from '../../controllers'
import auth from '../../middlewares/auth'
import formidable from 'express-formidable'

const router = express.Router()

router.post('/file', auth(), formidable(), uploadController.uploadFile)
router.post('/multiple', auth(), formidable({ multiples: true }), uploadController.uploadFiles)

export default router
