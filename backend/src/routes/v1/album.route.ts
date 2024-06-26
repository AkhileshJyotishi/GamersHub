import express from 'express'
import validate from '../../middlewares/validate'
import auth from '../../middlewares/auth'
import { albumValidation } from '../../validations'
import { albumController } from '../../controllers'

const router = express.Router()

router
  .route('/user')
  .post(auth(), validate(albumValidation.createAlbum), albumController.createUserAlbum)
  .delete(auth(), albumController.deleteUserAlbums)

router.get('/', albumController.getAllAlbums)

router.get('/user/:id', validate(albumValidation.paramsValidation), albumController.getUserAlbums)

router
  .route('/:id')
  .get(validate(albumValidation.paramsValidation), albumController.getAlbumById)
  .patch(auth(), validate(albumValidation.updateAlbumValidation), albumController.updateAlbumById)
  .delete(auth(), validate(albumValidation.paramsValidation), albumController.deleteAlbumById)

export default router
