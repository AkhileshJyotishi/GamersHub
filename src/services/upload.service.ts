import s3 from '../config/aws-client'
import config from '../config/config'

/**
 * Upload a file
 * @param {ObjectId} file
 * @returns {Promise<Album[]>}
 */

const uploadFile = async (file: any): Promise<any> => {
  console.log('file', file)
  const params = {
    Bucket: config.backblaze.bucket,
    Key: `uploads/${Date.now()}_${file.originalname}`,
    Body: file.buffer
  }

  // Upload file to Backblaze B2 Cloud Storage
  s3.upload(params, (err: any, data: any) => {
    if (err) {
      console.error('Error uploading file to Backblaze B2:', err)
      return { error: 'Internal Server Error' }
    }

    // Optionally, you can save additional information about the file in your database.
    console.log(data)
    return data
  })
}

export default {
  uploadFile
}
