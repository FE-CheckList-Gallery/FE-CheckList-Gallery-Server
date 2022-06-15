import { Schema } from 'mongoose'

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    lowerName: {
      type: String,
      required: true,
      unique: true
    },
    post: {
      type: Number,
      required: true,
      default: 1
    }
  },
  {
    collection: 'categories'
  }
)

export { CategorySchema }
