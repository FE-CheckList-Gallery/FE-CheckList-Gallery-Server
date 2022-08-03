import cors from 'cors'
import express from 'express'
import path from 'path'
import { v1Router } from './routers'
import { errorHandler } from './middlewares'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const app = express()
// CORS 에러 방지
app.use(
  cors({
    origin: ['https://fe-checklist-gallery.herokuapp.com'],
    credentials: true
  })
)

// request console
app.use(morgan('tiny'))

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// v1 router.
app.use('/', v1Router)
app.get('/', (req, res) => {
  res.send('FE-CheckList-Gallery-API')
})

// 순서 중요 (errorHandler은 다른 일반 라우팅보다 나중에 있어야 함)
// 그래야, 에러가 났을 때 next(error) 했을 때 여기로 오게 됨
app.use(errorHandler)

export { app }
