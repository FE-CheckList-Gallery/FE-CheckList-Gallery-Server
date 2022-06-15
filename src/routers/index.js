import fs from 'fs'
import path from 'path'
import express from 'express'

const v1Router = express.Router()
const indexJs = path.basename(__filename)

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== indexJs) && (file.slice(-9) === 'router.js'))
  .forEach((routeFile) => v1Router.use(`/${routeFile.split('-')[0]}`, require(`./${routeFile}`).default))

export { v1Router }
