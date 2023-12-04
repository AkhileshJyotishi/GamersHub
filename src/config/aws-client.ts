import AWS from 'aws-sdk'
import config from '../config/config'

let s3: any
try {
  s3 = new AWS.S3({
    accessKeyId: config.backblaze.accessKey,
    secretAccessKey: config.backblaze.secretAccess,
    endpoint: config.backblaze.url
  })
} catch (error) {
  console.log('Init error', error)
}
export default s3
