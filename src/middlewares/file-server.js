import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../uploads')
    const time = req.requestTime
    const authorTime = req.currentUserId + '_' + time
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    if (!fs.existsSync(path.join(dir, authorTime))) fs.mkdirSync(path.join(dir, authorTime))
    cb(null, path.join(dir, authorTime))
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname
    cb(null, fileName)
  }
})

const fileServer = multer({ storage })

export { fileServer }
