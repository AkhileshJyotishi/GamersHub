import express from 'express'
import validate from '../../middlewares/validate'
import auth from '../../middlewares/auth'
import { adminValidation } from '../../validations'
import { adminController } from '../../controllers'

const router = express.Router()

router
  .route('/manage-user/:userId')
  .delete(
    auth('manageUsers'),
    validate(adminValidation.blacklistUserById),
    adminController.blacklistUserById
  )
router.delete(
  '/manage-user',
  auth('manageUsers'),
  validate(adminValidation.blacklistUserByEmail),
  adminController.blacklistUserByEmail
)

export default router

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin panel
 */

/**
 * @swagger
 * /admin/manage-user/{userId}:
 *   delete:
 *     summary: Blacklist a user
 *     description: Admin can blacklist any user.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of user to be blacklisted
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
