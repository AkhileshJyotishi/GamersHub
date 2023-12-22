import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'
import { uploadService } from '../services'
import { sendResponse } from '../utils/response'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Allow<T = any> = T | null

const uploadFile = catchAsync(async (req, res) => {
  const { file } = req.files as Allow
  const { type } = req.fields as Allow
  const userId = res.locals.user.id
  if (!file) {
    sendResponse(res, httpStatus.BAD_REQUEST, { code: 400 }, null, 'No file uploaded')
  } else {
    const response = await uploadService.uploadFile(file, type, userId)
    sendResponse(res, httpStatus.OK, null, { image: response }, 'Image successfully uploaded')
  }
})

const uploadFiles = catchAsync(async (req, res) => {
  const { files } = req.files as Allow
  const { type } = req.fields as Allow
  const userId = res.locals.user.id
  if (!files || files.length === 0) {
    sendResponse(res, httpStatus.BAD_REQUEST, { code: 400 }, null, 'No file uploaded')
  } else {
    const response = await uploadService.uploadFiles(files, type, userId)

    sendResponse(res, httpStatus.OK, null, { image: response }, 'Image successfully uploaded')
  }
})

export default {
  uploadFile,
  uploadFiles
}
