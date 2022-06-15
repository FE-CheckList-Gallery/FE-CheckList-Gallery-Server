import { model } from 'mongoose'
import { UserSchema } from '../schemas/user-schema'
import { WithdrawalSchema } from '../schemas/withdrawal-schema'

const User = model('users', UserSchema)
const Withdrawal = model('withrawals', WithdrawalSchema)

export class UserModel {
  async findById (DBId) {
    const user = await User.findOne({ _id: DBId })
    return user
  }

  async findWithdrawal (GHId) {
    const withdrawal = await Withdrawal.findOne({ id: GHId })
    return withdrawal
  }

  async findByGHId (GHId) {
    const user = await User.findOne({ id: GHId })
    return user
  }

  async create (userInfo) {
    const createdNewUser = await User.create(userInfo)
    return createdNewUser
  }

  async findAll () {
    const users = await User.find({})
    return users
  }

  async update ({ userId, update }) {
    const filter = { _id: userId }
    const option = { returnOriginal: false }

    const updatedUser = await User.findOneAndUpdate(filter, update, option)
    return updatedUser
  }

  async delete (user) {
    const { id, displayName, _id } = user
    await Withdrawal.create({ id, displayName })
    await User.deleteOne({ _id })
  }
}

const userModel = new UserModel()

export { userModel }
