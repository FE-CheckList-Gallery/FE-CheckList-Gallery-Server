import { Router } from 'express'
import { categoryService } from '../services'

const categoryRouter = Router()

categoryRouter.get('/', async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategory()
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
})

categoryRouter.get('/:search', async (req, res, next) => {
  const { search } = req.params
  try {
    const categories = await categoryService.searchCategory(search)
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
})

export default categoryRouter
