import multer from 'multer'
let uploadDisk: any
try {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/')
    },
    filename: function (req, file, cb) {
      cb(null, `${new Date().toISOString()}-${file.originalname}`)
    }
  })

  uploadDisk = multer({ storage })
} catch (error) {
  console.log('multer error', error)
}

export default uploadDisk
