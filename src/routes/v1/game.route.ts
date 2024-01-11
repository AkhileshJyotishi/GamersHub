import express from 'express'
import validate from '../../middlewares/validate'
import auth from '../../middlewares/auth'
import { gameController } from '../../controllers'
import { gameValidation } from '../../validations'

const router = express.Router()

router.get('/', validate(gameValidation.queryGame), gameController.getAllGames)
router
  .route('/user')
  .post(auth(), validate(gameValidation.createGame), gameController.createUserGame)
  .delete(auth(), gameController.deleteUserGames)

router.get('/user/saved', auth(), gameController.getSavedGames)
router.get(
  '/others',
  auth(),
  validate(gameValidation.queryGame),
  gameController.getAllGameExceptCurrentUser
)

router.post(
  '/user/save/:id',
  auth(),
  validate(gameValidation.idValidation),
  gameController.toggleSaveGame
)

router.get('/user/:id', validate(gameValidation.myGamesValidation), gameController.getUserGames)
router
  .route('/:id')
  .get(validate(gameValidation.idValidation), gameController.getGameById)
  .patch(auth(), validate(gameValidation.updateGame), gameController.updateGameById)
  .delete(auth(), validate(gameValidation.idValidation), gameController.deleteGameById)

export default router
