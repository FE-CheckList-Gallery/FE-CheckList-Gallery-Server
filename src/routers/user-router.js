import { Router } from 'express'
import { loginRequired } from '../middlewares'
import { userService } from '../services'
import is from '@sindresorhus/is'

const userRouter = Router()

userRouter.get('/', async (req, res, next) => {
  try {
    const allUsers = await userService.getUser()
    res.status(200).json(allUsers)
  } catch (error) {
    next(error)
  }
})

userRouter.get('/:userId', async (req, res, next) => {
  const { userId } = req.params
  try {
    const user = await userService.getUser(userId, false)
    if (!user) {
      throw new Error('없는 유저입니다.')
    }

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

userRouter.patch('/:userId', loginRequired, async (req, res, next) => {
  const { userId } = req.params
  const { displayName, username, blog } = req.body

  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      )
    }
    if (req.currentUserId !== userId) {
      throw new Error('수정 권한이 없습니다.')
    }
    const allUsers = await userService.setUser(userId, { displayName, username, blog })
    res.status(200).json(allUsers)
  } catch (error) {
    next(error)
  }
})

userRouter.delete('/:userId', loginRequired, async (req, res, next) => {
  const { userId } = req.params
  try {
    if (req.currentUserId !== userId) {
      throw new Error('삭제 권한이 없습니다.')
    }
    const removedUser = await userService.removeUser(userId)
    res.status(200).json(removedUser)
  } catch (error) {
    next(error)
  }
})

export default userRouter
