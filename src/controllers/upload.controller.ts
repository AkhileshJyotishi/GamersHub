import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'
import { uploadService } from '../services'
import { sendResponse } from '../utils/response'

const uploadFile = catchAsync(async (req, res) => {
  const file = req.file
  if (!file) {
    sendResponse(res, httpStatus.BAD_REQUEST, { code: 400 }, null, 'No file uploaded')
  }
  const response = await uploadService.uploadFile(file)
  sendResponse(res, httpStatus.OK, null, { image: response }, 'Image successfully uploaded')
})

export default {
  uploadFile
}
