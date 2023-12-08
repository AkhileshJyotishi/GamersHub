import express from 'express'
import uploadDisk from '../../middlewares/multer'
import { uploadController } from '../../controllers'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/file', auth(), uploadDisk.single('file'), uploadController.uploadFile)
router.post('/multiple', auth(), uploadDisk.array('files', 10), uploadController.uploadFiles)

export default router
