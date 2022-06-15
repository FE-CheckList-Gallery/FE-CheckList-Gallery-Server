import { postModel } from '../db'

class PostService {
  constructor (postModel) {
    this.postModel = postModel
  }

  async addPost (title, description, categories, author, code) {
    const newPost = this.postModel.create({ title, description, categories, author, code })
    return newPost
  }

  async getPosts (page, watch, authorId, categoryId) {
    const posts = this.postModel.findAll(page, watch, authorId, categoryId)
    return posts
  }
}

const postService = new PostService(postModel)

export { postService }
