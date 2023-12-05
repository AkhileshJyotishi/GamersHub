import express from 'express'
import uploadDisk from '../../middlewares/multer'
import { uploadController } from '../../controllers'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/file', auth(), uploadDisk.single('file'), uploadController.uploadFile)

export default router
