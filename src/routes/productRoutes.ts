import { Router } from 'express'
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController'

const router = Router()

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)

export default router
