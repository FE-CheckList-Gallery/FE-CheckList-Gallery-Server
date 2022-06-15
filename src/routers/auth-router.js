import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

const authRouter = Router()

authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

authRouter.get('/github/callback', passport.authenticate('github', { failureRedirect: '/auth/github', session: false }),
  function (req, res) {
    const token = jwt.sign(req.user, process.env.JWT_SECRET_KEY, { expiresIn: process.env.ACCESSTOKEN_EXPIRE })
    res.status(200).json(token)
  })

export default authRouter
