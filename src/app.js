import cors from 'cors'
import express from 'express'
import path from 'path'
import { v1Router } from './routers'
import { errorHandler } from './middlewares'
import passportInit from './middlewares/passport'

const app = express()
passportInit()

// CORS 에러 방지
app.use(cors())

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json())

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// v1 router.
app.use('/', v1Router)

// 순서 중요 (errorHandler은 다른 일반 라우팅보다 나중에 있어야 함)
// 그래야, 에러가 났을 때 next(error) 했을 때 여기로 오게 됨
app.use(errorHandler)

export { app }