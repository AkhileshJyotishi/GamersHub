import AWS from 'aws-sdk'
import config from '../config/config'
import ApiError from '../utils/api-error'
import httpStatus from 'http-status'

let s3: any
try {
  s3 = new AWS.S3({
    region: config.backblaze.region,
    credentials: {
      accessKeyId: config.backblaze.accessKey,
      secretAccessKey: config.backblaze.secretAccess
    },
    endpoint: config.backblaze.url,
    signatureVersion: 'v4'
  })
} catch (error) {
  throw new ApiError(httpStatus.BAD_REQUEST, 'Bad credentials')
}
export default s3
