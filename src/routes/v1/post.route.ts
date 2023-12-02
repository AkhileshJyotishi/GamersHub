import express from 'express'
import validate from '../../middlewares/validate'
import auth from '../../middlewares/auth'
import { postController } from '../../controllers'
import { postValidation } from '../../validations'

const router = express.Router()

router
  .route('/user')
  .post(auth(), validate(postValidation.createPost), postController.createUserPost)
  .delete(auth(), postController.deleteUserPosts)

router.get('/user/:id', validate(postValidation.paramValidation), postController.getUserPosts)

router.get('/', postController.getAllPosts)
router.get('/others', auth(), postController.getAllPostExceptCurrentUser)

router
  .route('/like/:id')
  .post(auth(), validate(postValidation.paramValidation), postController.likePost)
  .delete(auth(), validate(postValidation.paramValidation), postController.dislikePost)

router.get('/user/liked', auth(), postController.getLikedPosts)
router.get('/user/saved', auth(), postController.getSavedPosts)

router.post(
  '/user/save/:id',
  auth(),
  validate(postValidation.paramValidation),
  postController.toggleSavePost
)

router
  .route('/comment/:id')
  .post(auth(), validate(postValidation.addComment), postController.addComment)
  .delete(auth(), validate(postValidation.paramValidation), postController.deleteComment)

router
  .route('/:id')
  .get(validate(postValidation.paramValidation), postController.getPostById)
  .patch(auth(), validate(postValidation.updatePost), postController.updatePostById)
  .delete(auth(), validate(postValidation.paramValidation), postController.deletePostById)

export default router
