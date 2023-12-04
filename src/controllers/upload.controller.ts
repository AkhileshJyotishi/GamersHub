import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'
import { uploadService } from '../services'
import { sendResponse } from '../utils/response'

const uploadFile = catchAsync(async (req, res) => {
  const file = req.file

  // Check if a file is present in the request
  if (!file) {
    sendResponse(res, httpStatus.BAD_REQUEST, { code: 400 }, null, 'No file uploaded')
  }
  const response = await uploadService.uploadFile(file)
  console.log('response', response)
})

export default {
  uploadFile
}
