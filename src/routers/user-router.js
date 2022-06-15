import { Router } from 'express'
import { userService } from '../services'

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
    const allUsers = await userService.getUser(userId, false)
    res.status(200).json(allUsers)
  } catch (error) {
    next(error)
  }
})

userRouter.patch('/:userId', async (req, res, next) => {
  const { userId } = req.params
  const { displayName, username, blog } = req.body
  try {
    const allUsers = await userService.setUser(userId, { displayName, username, blog })
    res.status(200).json(allUsers)
  } catch (error) {
    next(error)
  }
})

userRouter.delete('/:userId', async (req, res, next) => {
  const { userId } = req.params
  try {
    const allUsers = await userService.getUser(userId, false)
    res.status(200).json(allUsers)
  } catch (error) {
    next(error)
  }
})

export default userRouter
