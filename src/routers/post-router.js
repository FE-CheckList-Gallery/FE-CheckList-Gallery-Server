import { Router } from 'express'
import { loginRequired, fileServer } from '../middlewares'
import { postService, categoryService } from '../services'

const postRouter = Router()

postRouter.get('/', async (req, res, next) => {
  const { page, show, authorId, categoryId } = req.query
  try {
    const posts = await postService.getPosts(page, show, authorId, categoryId)
    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
})

postRouter.post('/', loginRequired, fileServer.array('code'), async (req, res, next) => {
  let { title, description, categories, author } = req.body
  const code = req.files.map(file => ({ fileName: file.originalname, fileUrl: process.env.BASE_URL + `/uploads/${req.currentUserId}/` + file.filename }))
  try {
    const setCategories = new Set(categories.map(value => value.toLowerCase()))

    if (setCategories.size !== categories.length) {
      throw new Error('중복된 카테고리가 있습니다.')
    }

    categories = await categoryService.addCategory(categories)
    const post = await postService.addPost(title, description, categories, author, code)
    res.status(201).json(post)
  } catch (error) {
    next(error)
  }
})

export default postRouter
