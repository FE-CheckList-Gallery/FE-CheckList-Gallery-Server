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
    createdAt: {
      type: Date,
      expires: 43200,
      default: Date.now
    }
  },
  {
    collection: 'withdrawals',
    timestamps: true
  }
)

export { WithdrawalSchema }
