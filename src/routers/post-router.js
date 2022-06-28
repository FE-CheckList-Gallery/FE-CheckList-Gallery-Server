import { Router } from 'express'
import { loginRequired, fileServer } from '../middlewares'
import { postService, categoryService } from '../services'
import axios from 'axios'

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

postRouter.post('/',
  loginRequired,
  fileServer.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'code', maxCount: 5 }
  ]),
  async (req, res, next) => {
    let { title, description, categories } = req.body
    const author = req.currentUserId
    const code = req.files.code.map((file) => ({
      fileName: file.originalname,
      fileUrl:
        process.env.BASE_URL +
        `/uploads/${req.currentUserId}_${req.requestTime}/` +
        file.filename
    }))
    const thumbnail = req.files.thumbnail.map((file) => ({
      fileName: file.originalname,
      fileUrl:
        process.env.BASE_URL +
        `/uploads/${req.currentUserId}_${req.requestTime}/` +
        file.filename
    }))[0]

    categories = Array.isArray(categories)
      ? categories
      : [categories]

    try {
      const setCategories = new Set(categories.map(value => value.toLowerCase()))

      if (setCategories.size !== categories.length) {
        throw new Error('중복된 카테고리가 있습니다.')
      }

      categories = await categoryService.addCategory(categories)
      const post = await postService.addPost(title, description, categories, author, code, thumbnail)

      await Promise.all(code.map(async ({ fileName, fileUrl }) => {
        const posturl = process.env.BASE_VIEWER_URL
        await axios.post(posturl, { fileUrl })
      }))

      res.status(201).json(post)
    } catch (error) {
      next(error)
    }
  })

postRouter.patch(
  '/:postId',
  loginRequired,
  fileServer.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'code', maxCount: 5 }
  ]),
  async (req, res, next) => {
    const { postId } = req.params
    let { title, description, categories } = req.body
    const author = req.currentUserId
    const code = req.files.code.map((file) => ({
      fileName: file.originalname,
      fileUrl:
        process.env.BASE_URL +
        `/uploads/${req.currentUserId}_${req.requestTime}/` +
        file.filename
    }))
    const thumbnail = req.files.thumbnail.map((file) => ({
      fileName: file.originalname,
      fileUrl:
        process.env.BASE_URL +
        `/uploads/${req.currentUserId}_${req.requestTime}/` +
        file.filename
    }))[0]

    categories = Array.isArray(categories)
      ? categories
      : [categories]
    try {
      const setCategories = new Set(
        categories.map((value) => value.toLowerCase())
      )
      const originPost = await postService.getPost(postId)

      if (!originPost) {
        throw new Error('수정할 게시글이 없습니다.')
      }
      const originCategory = originPost.categories.map(
        (category) => category.category.name
      )
      if (author !== originPost.author._id.toString()) {
        throw new Error('수정 권한이 없습니다.')
      }

      if (setCategories.size !== categories.length) {
        throw new Error('중복된 카테고리가 있습니다.')
      }
      await categoryService.deleteCategory(originCategory)
      categories = await categoryService.addCategory(categories)
      const post = await postService.setPosts(postId, {
        title,
        description,
        categories,
        author,
        code,
        thumbnail
      })

      await Promise.all(
        code.map(async ({ fileName, fileUrl }) => {
          const posturl = process.env.BASE_VIEWER_URL
          await axios.post(posturl, { fileUrl })
        })
      )

      res.status(200).json(post)
    } catch (error) {
      next(error)
    }
  }
)

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
