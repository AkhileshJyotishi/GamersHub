import express from 'express'
import validate from '../../middlewares/validate'
import auth from '../../middlewares/auth'
import { helpValidation } from '../../validations'
import { helpController } from '../../controllers'

const router = express.Router()

router.post(
  '/category/add',
  auth('manageUsers'),
  validate(helpValidation.newCategoryValidation),
  helpController.addCategory
)
router.get('/category', helpController.getAllCategory)

router
  .route('/category/:id')
  .get(validate(helpValidation.paramsValidation), helpController.getCategoryById)
  .patch(
    auth('manageUsers'),
    validate(helpValidation.updateCategoryValidation),
    helpController.updateCategoryById
  )
  .delete(
    auth('manageUsers'),
    validate(helpValidation.paramsValidation),
    helpController.deleteCategoryById
  )

router.get('/', helpController.getAllQuestions)
router.post(
  '/add',
  auth('manageUsers'),
  validate(helpValidation.newQuestionValidation),
  helpController.addHelpQuestion
)
router
  .route('/:id')
  .get(validate(helpValidation.paramsValidation), helpController.getHelpQuestionById)
  .patch(
    auth('manageUsers'),
    validate(helpValidation.updateQuestionValidation),
    helpController.updateHelpQuestion
  )
  .delete(
    auth('manageUsers'),
    validate(helpValidation.paramsValidation),
    helpController.deleteHelpQuestion
  )
export default router
