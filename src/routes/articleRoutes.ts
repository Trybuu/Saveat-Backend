import { Router } from 'express'
import {
  getArticles,
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articleController'

const router = Router()

router.route('/').get(getArticles).post(createArticle)
router.route('/:id').get(getArticle).patch(updateArticle).delete(deleteArticle)

export default router
