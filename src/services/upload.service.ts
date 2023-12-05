import s3 from '../config/aws-client'
import config from '../config/config'
import fs from 'fs'
import ApiError from '../utils/api-error'
import httpStatus from 'http-status'

/**
 * Upload a file
 * @param {ObjectId} file
 * @returns {Promise<Album[]>}
 */
const uploadFile = async (file: any): Promise<any> => {
  try {
    const params = {
      Bucket: config.backblaze.bucket,
      Key: `uploads/${Date.now()}_${file.originalname}`,
      Body: fs.createReadStream(file.path)
    }

    const data = await s3.upload(params).promise()
    return data
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'File uploading failed')
  }
}

export default {
  uploadFile
}
