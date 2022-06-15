import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../uploads')
    const author = req.currentUserId
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    if (!fs.existsSync(path.join(dir, author))) fs.mkdirSync(path.join(dir, author))
    cb(null, path.join(dir, author))
  },
  filename: function (req, file, cb) {
    const fileName = new Date().valueOf() + '_' + file.fieldname + '_' + file.originalname
    cb(null, fileName)
  }
})

const fileServer = multer({ storage })

export { fileServer }
