import express from 'express'
import uploadDisk from '../../middlewares/multer'
import { uploadController } from '../../controllers'

const router = express.Router()

router.post('/file', uploadDisk.single('file'), uploadController.uploadFile)

export default router
