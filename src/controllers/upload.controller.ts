import httpStatus from 'http-status'
import catchAsync from '../utils/catch-async'
import { uploadService } from '../services'
import { sendResponse } from '../utils/response'
import fs from 'fs'
import { promisify } from 'util'

const unlinkAsync = promisify(fs.unlink)
const uploadFile = catchAsync(async (req, res) => {
  const file = req.file
  if (!file) {
    sendResponse(res, httpStatus.BAD_REQUEST, { code: 400 }, null, 'No file uploaded')
  } else {
    const response = await uploadService.uploadFile(file)
    await unlinkAsync(req?.file?.path as string)
    sendResponse(res, httpStatus.OK, null, { image: response }, 'Image successfully uploaded')
  }
})

const uploadFiles = catchAsync(async (req, res) => {
  const files = req.files
  if (!files || files.length === 0) {
    sendResponse(res, httpStatus.BAD_REQUEST, { code: 400 }, null, 'No file uploaded')
  } else {
    const response = await uploadService.uploadFiles(files)
    // files.forEach(async (file)=>{
    //   await unlinkAsync(req?.file?.path as string)
    // })
    sendResponse(res, httpStatus.OK, null, { image: response }, 'Image successfully uploaded')
  }
})

export default {
  uploadFile,
  uploadFiles
}
