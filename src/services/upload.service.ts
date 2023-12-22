import s3 from '../config/aws-client'
import config from '../config/config'
import ApiError from '../utils/api-error'
import httpStatus from 'http-status'
import fs from 'fs'
import userService from './user.service'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Allow<T = any> = T | null

/**
 * Upload a file
 * @param {File} file
 * @param {string} type
 * @returns {Promise<object>}
 */
const uploadFile = async (file: Allow, type: string, userId: number): Promise<object> => {
  try {
    const user = await userService.getUserById(userId)
    let key
    if (type == 'jobs') {
      key = `uploads/jobs/${user?.username}/${Date.now()}_${file.name}`
    } else if (type == 'portfolio') {
      key = `uploads/portfolio/${user?.username}/${Date.now()}_${file.name}`
    } else if (type === 'games') {
      key = `uploads/games/${user?.username}/${Date.now()}_${file.name}`
    } else {
      key = `uploads/user/${user?.username}/${Date.now()}_${file.name}`
    }
    const params = {
      Bucket: config.backblaze.bucket,
      Key: key,
      Body: fs.createReadStream(file.path)
    }

    const data = await s3.upload(params).promise()
    return data
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'File uploading failed')
  }
}

/**
 * Upload multiple files
 * @param {ObjectId} files
 * @param {string} type
 * @returns {Promise<object[]>}
 */
const uploadFiles = async (files: Allow, type: string, userId: number): Promise<Allow> => {
  try {
    const user = await userService.getUserById(userId)

    const uploadResults = await Promise.all(
      files?.map((file: Allow) => {
        // AWS S3 Upload Parameters
        let key
        if (type == 'jobs') {
          key = `uploads/jobs/${user?.username}/${Date.now()}_${file.name}`
        } else if (type == 'portfolio') {
          key = `uploads/portfolio/${user?.username}/${Date.now()}_${file.name}`
        } else if (type === 'games') {
          key = `uploads/games/${user?.username}/${Date.now()}_${file.name}`
        } else {
          key = `uploads/user/${user?.username}/${Date.now()}_${file.name}`
        }
        const params = {
          Bucket: config.backblaze.bucket,
          Key: key,
          Body: fs.createReadStream(file.path)
        }

        return new Promise((resolve, reject) => {
          // Upload each file to Backblaze B2 Cloud Storage
          s3.upload(params, (err: Allow, data: Allow) => {
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
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'File uploading failed')
  }
}

export default {
  uploadFile,
  uploadFiles
}
