import { userModel } from '../db'
import { postService } from './'

class UserService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor (userModel) {
    this.userModel = userModel
  }

  // 회원가입
  async addAuthUser (userInfo) {
    // 객체 destructuring
    const { id } = userInfo

    // 이메일 중복 확인
    const user = await this.userModel.findByGHId(id)

    if (user) {
      throw new Error(
        '이미 가입된 유저입니다.'
      )
    }
    // db에 저장
    const createdNewUser = await this.userModel.create(userInfo)

    return createdNewUser
  }

  // 사용자 목록을 받음.
  async getUser (userId, auth) {
    let user
    if (userId) {
      user = await auth ? this.userModel.findByGHId(userId) : this.userModel.findById(userId)
    } else {
      user = await this.userModel.findAll()
    }
    return user
  }

  async getWithdrawal (id) {
    const withdrawal = await this.userModel.findWithdrawal(id)
    return withdrawal
  }

  // 유저정보 수정, 현재 비밀번호가 있어야 수정 가능함.
  async setUser (userId, toUpdate) {
    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await this.userModel.findById(userId)

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.')
    }

    // 업데이트 진행
    user = await this.userModel.update({
      userId,
      update: toUpdate
    })

    return user
  }

  async removeUser (userId) {
    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await this.userModel.findById(userId)

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.')
    }
    const userPosts = await postService.getPosts({ authorId: userId })
    await Promise.all(userPosts.map(async (post) => {
      await postService.deletePost(post._id)
    }))
    user = await this.userModel.delete(user)
  }
}

const userService = new UserService(userModel)

export { userService }
