import { Schema } from 'mongoose'

const WithdrawalSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    expireAt: {
      type: Date,
      expires: '30d',
      default: Date.now
    }
  },
  {
    collection: 'withdrawals',
    timestamps: true
  }
)

export { WithdrawalSchema }
