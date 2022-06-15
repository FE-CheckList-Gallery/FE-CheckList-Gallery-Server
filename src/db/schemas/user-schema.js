import { Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    profileUrl: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    blog: {
      type: String
    }
  },
  {
    collection: 'users',
    timestamps: true
  }
)

export { UserSchema }
