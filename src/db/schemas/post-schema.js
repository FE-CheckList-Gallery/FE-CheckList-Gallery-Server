import { Schema } from 'mongoose'

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    categories: [{
      category: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
      }
    }],
    code: [{
      type: new Schema(
        {
          fileName: String,
          fileUrl: String
        }
      )
    }],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      require: true
    }
  },
  {
    collection: 'posts',
    timestamps: true
  }
)

export { PostSchema }
