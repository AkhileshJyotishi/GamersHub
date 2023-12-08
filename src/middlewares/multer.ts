import multer from 'multer'
let uploadDisk: Allow
try {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/home/yashagarwal/Desktop')
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
