import { Router } from 'express'
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController'

import { protect, restrictTo } from '../controllers/authController'

const router = Router()

router.route('/').get(protect, getProducts).post(protect, createProduct)
router
  .route('/:id')
  .get(protect, getProduct)
  .patch(protect, restrictTo('moderator', 'admin'), updateProduct)
  .delete(protect, restrictTo('moderator', 'admin'), deleteProduct)

export default router
