import { categoryModel } from '../db'

class CategoryService {
  constructor (categoryModel) {
    this.categoryModel = categoryModel
  }

  async getAllCategory () {
    const categories = await this.categoryModel.findAll()
    return categories
  }

  async addCategory (categoryNames) {
    const postedCategory = await Promise.all(categoryNames.map(async (name) => {
      const searched = await this.categoryModel.findByName(name.toLowerCase())
      if (!searched) {
        return await this.categoryModel.create({ name, lowerName: name.toLowerCase() })
      } else {
        return await this.categoryModel.update(searched._id, { post: searched.post + 1 })
      }
    }))
    return postedCategory.map(value => {
      return ({ category: value._id })
    })
  }

  async searchCategory (keyword) {
    const lowerKeyword = keyword.toLowerCase()
    const allCategory = await this.categoryModel.findAll()

    const searchCategory = allCategory
      .filter(category => category.lowerName.match(lowerKeyword))
      .sort((a, b) => { return a.lowerName.search() - b.lowerName.search() })

    return searchCategory
  }
}

const categoryService = new CategoryService(categoryModel)

export { categoryService }
