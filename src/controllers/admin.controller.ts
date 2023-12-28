import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'
import { adminService, userService } from '../services'
import ApiError from '../utils/api-error'
import { sendResponse } from '../utils/response'

const blacklistUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  await adminService.blacklistUser(user)
  sendResponse(res, httpStatus.OK, null, null, 'User Blacklisted Successfully')
})

const unblacklistUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  await adminService.unblacklistUser(user)
  sendResponse(res, httpStatus.OK, null, null, 'User Unblacklisted Successfully')
})

const blacklistUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.body
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  await adminService.blacklistUser(user)
  sendResponse(res, httpStatus.OK, null, null, 'User Blacklisted Successfully')
})

const unblacklistUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.body
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  await adminService.unblacklistUser(user)
  sendResponse(res, httpStatus.OK, null, null, 'User Unblacklisted Successfully')
})

const getBlacklistedUser = catchAsync(async (req, res) => {
  const blacklistedUsers = await adminService.getAllBlacklistedUsers()
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { users: blacklistedUsers },
    'Blacklisted Users fetched Successfully'
  )
})
const getUnblacklistedUser = catchAsync(async (req, res) => {
  const unblacklistedUsers = await adminService.getAllUnblacklistedUsers()
  sendResponse(
    res,
    httpStatus.OK,
    null,
    { users: unblacklistedUsers },
    'Unblacklisted Users fetched Successfully'
  )
})

export default {
  blacklistUserById,
  unblacklistUserById,
  blacklistUserByEmail,
  unblacklistUserByEmail,
  getBlacklistedUser,
  getUnblacklistedUser
}
