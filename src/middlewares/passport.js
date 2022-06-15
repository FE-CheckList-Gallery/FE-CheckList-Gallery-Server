import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { userService } from '../services/user-service'

// DB에 있는 유저일 시 로그인, 없을 시 회원 등록
const findOrCreateUser = async (profile) => {
  const user = await userService.getUser(profile.id, true)

  if (user) {
    return user
  }
  const withdrawal = await userService.getWithdrawal(profile.id)
  if (withdrawal) {
    throw new Error('탈퇴한 회원입니다.')
  }
  const created = await userService.addAuthUser(profile)

  return created
}
export default function passportInit () {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/github/callback`
  },
  async function (accessToken, refreshToken, profile, done) {
    const userInfo = {
      id: profile.id,
      displayName: profile.displayName,
      username: profile.username,
      profileUrl: profile.profileUrl,
      avatar: profile._json.avatar_url,
      blog: profile._json.blog
    }

    try {
      const user = await findOrCreateUser(userInfo)
      done(null, {
        id: user._id,
        name: user.displayName
      })
    } catch (e) {
      done(e, null)
    }
  }
  ))
}
