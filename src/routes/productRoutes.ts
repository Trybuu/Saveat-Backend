import { Router } from 'express'
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController'

import { protect } from '../controllers/authController'

const router = Router()

router.route('/').get(protect, getProducts).post(protect, createProduct)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)

export default router
