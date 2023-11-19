import express from 'express'
import validate from '../../middlewares/validate'
import auth from '../../middlewares/auth'
import { gameController } from '../../controllers'
import { gameValidation } from '../../validations'

const router = express.Router()

router.get('/', gameController.getAllGames)
router
  .route('/user')
  .get(auth(), gameController.getUserGames)
  .post(auth(), validate(gameValidation.createGame), gameController.createUserGame)
  .delete(auth(), gameController.deleteUserGames)

router.get('/user/saved', auth(), gameController.getSavedGames)
router.get('/others', auth(), gameController.getAllGameExceptCurrentUser)

router.post(
  '/user/save/:id',
  auth(),
  validate(gameValidation.idValidation),
  gameController.toggleSaveGame
)

router
  .route('/:id')
  .get(validate(gameValidation.idValidation), gameController.getGameById)
  .patch(auth(), validate(gameValidation.updateGame), gameController.updateGameById)
  .delete(auth(), validate(gameValidation.idValidation), gameController.deleteGameById)

export default router
