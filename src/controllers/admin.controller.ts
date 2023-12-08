import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'
import { adminService, userService } from '../services'
import ApiError from '../utils/api-error'

const blacklistUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  await adminService.blacklistUser(user)
  res.status(httpStatus.NO_CONTENT).send()
})

const blacklistUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.body
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  await adminService.blacklistUser(user)
  res.status(httpStatus.NO_CONTENT).send()
})

export default {
  blacklistUserById,
  blacklistUserByEmail
}
