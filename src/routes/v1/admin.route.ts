import express from 'express'
import validate from '../../middlewares/validate'
import auth from '../../middlewares/auth'
import { adminValidation } from '../../validations'
import { adminController } from '../../controllers'

const router = express.Router()

router.get('/blacklist', auth('getUsers'), adminController.getBlacklistedUser)
router.get('/unblacklist', auth('getUsers'), adminController.getUnblacklistedUser)

router.post(
  '/blacklist/email',
  auth('manageUsers'),
  validate(adminValidation.userEmailValidation),
  adminController.blacklistUserByEmail
)
router.post(
  '/include/email',
  auth('manageUsers'),
  validate(adminValidation.userEmailValidation),
  adminController.unblacklistUserByEmail
)
router.post(
  '/blacklist/:userId',
  auth('manageUsers'),
  validate(adminValidation.paramsValidation),
  adminController.blacklistUserById
)
router.post(
  '/include/:userId',
  auth('manageUsers'),
  validate(adminValidation.paramsValidation),
  adminController.unblacklistUserById
)

export default router
