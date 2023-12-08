import s3 from '../config/aws-client'
import config from '../config/config'
import fs from 'fs'
import ApiError from '../utils/api-error'
import httpStatus from 'http-status'

/**
 * Upload a file
 * @param {ObjectId} file
 * @returns {Promise<object>}
 */
const uploadFile = async (file: any): Promise<object> => {
  try {
    const params = {
      Bucket: config.backblaze.bucket,
      Key: `uploads/${Date.now()}_${file.originalname}`,
      Body: fs.createReadStream(file.path)
    }

    const data = await s3.upload(params).promise()
    return data
  } catch (error) {
    console.log(error)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'File uploading failed')
  }
}

/**
 * Upload multiple files
 * @param {ObjectId} files
 * @returns {Promise<object[]>}
 */
const uploadFiles = async (files: any): Promise<any> => {
  try {
    const uploadResults = await Promise.all(
      files.map((file: any) => {
        // AWS S3 Upload Parameters
        const params = {
          Bucket: config.backblaze.bucket,
          Key: `uploads/${Date.now()}_${file.originalname}`,
          Body: fs.createReadStream(file.path)
        }

        return new Promise((resolve, reject) => {
          // Upload each file to Backblaze B2 Cloud Storage
          s3.upload(params, (err: any, data: any) => {
            if (err) {
              reject(err)
            } else {
              resolve(data)
            }
          })
        })
      })
    )

    return uploadResults
  } catch (error) {
    console.log(error)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'File uploading failed')
  }
}

export default {
  uploadFile,
  uploadFiles
}
