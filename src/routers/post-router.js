import { Router } from 'express'
import { loginRequired, fileServer } from '../middlewares'
import { postService, categoryService } from '../services'

const postRouter = Router()

postRouter.get('/', async (req, res, next) => {
  const { page, show, authorId, categoryId } = req.query
  try {
    const posts = await postService.getPosts({ page, show, authorId, categoryId })
    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
})

postRouter.get('/:postId', async (req, res, next) => {
  const { postId } = req.params
  try {
    const post = await postService.getPost(postId)
    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
})

postRouter.post('/', loginRequired, fileServer.array('code'), async (req, res, next) => {
  let { title, description, categories } = req.body
  const author = req.currentUserId
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

postRouter.patch('/:postId', loginRequired, fileServer.array('code'), async (req, res, next) => {
  const { postId } = req.params
  let { title, description, categories } = req.body
  const author = req.currentUserId
  const code = req.files.map(file => ({ fileName: file.originalname, fileUrl: process.env.BASE_URL + `/uploads/${req.currentUserId}/` + file.filename }))
  try {
    const setCategories = new Set(categories.map(value => value.toLowerCase()))
    const originPost = await postService.getPost(postId)
    const originCategory = originPost.categories.map((category) => category.category.name)
    if (author !== originPost.author._id.toString()) {
      throw new Error('수정 권한이 없습니다.')
    }

    if (setCategories.size !== categories.length) {
      throw new Error('중복된 카테고리가 있습니다.')
    }
    await categoryService.deleteCategory(originCategory)
    categories = await categoryService.addCategory(categories)
    const post = await postService.setPosts(
      postId,
      {
        title,
        description,
        categories,
        author,
        code
      }
    )
    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
})

postRouter.delete('/:postId', loginRequired, async (req, res, next) => {
  const { postId } = req.params
  try {
    const originPost = await postService.getPost(postId)
    const originCategory = originPost.categories.map(
      (category) => category.category.name
    )
    if (!originPost) {
      throw new Error('삭제할 게시물이 없습니다.')
    }
    if (req.currentUserId !== originPost.author._id.toString()) {
      throw new Error('삭제 권한이 없습니다.')
    }
    await categoryService.deleteCategory(originCategory)
    await postService.deletePost(postId)
    res.status(200).json('삭제완료')
  } catch (error) {
    next(error)
  }
})
export default postRouter
