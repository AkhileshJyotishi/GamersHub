import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'temp/') // Specify the directory where files will be stored temporarily
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().toISOString()}-${file.originalname}`)
  }
})

const uploadDisk = multer({ storage })

export default uploadDisk
