import { model } from 'mongoose'
import { PostSchema } from '../schemas/post-schema'

const Post = model('posts', PostSchema)

export class PostModel {
  async findById (postId) {
    const post = await Post.findOne({ _id: postId })
      .populate('author')
      .populate('categories.category')
      .lean()
    return post
  }

  async create (postInfo) {
    const createdNewPost = await Post.create(postInfo)
    return createdNewPost
  }

  async findAll (page, watch, authorId, categoryId) {
    const option = {}
    if (authorId) option.author = authorId
    if (categoryId) option['categories.category'] = categoryId
    let posts
    if (page && watch) {
      posts = await Post.find(option)
        .populate('author')
        .populate('categories.category')
        .sort({ createdAt: -1 })
        .skip(watch * (page - 1))
        .limit(watch)
    } else {
      posts = await Post.find(option)
        .populate('author')
        .populate('categories.category')
        .sort({ createdAt: -1 })
    }
    return posts
  }

  async update ({ postId, update }) {
    const filter = { _id: postId }
    const option = { returnOriginal: false }

    const updatedPost = await Post.findOneAndUpdate(filter, update, option)
    return updatedPost
  }

  async remove (postId) {
    await Post.deleteOne({ _id: postId })
  }
}

const postModel = new PostModel()

export { postModel }
