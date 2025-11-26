import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory'
import Article from '../models/article'

export const getArticles = getAll(Article)
export const getArticle = getOne(Article)
export const createArticle = createOne(Article)
export const updateArticle = updateOne(Article)
export const deleteArticle = deleteOne(Article)
