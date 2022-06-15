import { postModel } from '../db'

class PostService {
  constructor (postModel) {
    this.postModel = postModel
  }

  async addPost (title, description, categories, author, code) {
    const newPost = this.postModel.create({ title, description, categories, author, code })
    return newPost
  }

  async getPost (postId) {
    const post = this.postModel.findById(postId)
    return post
  }

  async getPosts ({ page, watch, authorId, categoryId }) {
    const posts = this.postModel.findAll(page, watch, authorId, categoryId)
    return posts
  }

  async setPosts (postId, update) {
    const updatedPost = await this.postModel.update({ postId, update })
    return updatedPost
  }

  async deletePost (postId) {
    await this.postModel.remove(postId)
  }
}

const postService = new PostService(postModel)

export { postService }
