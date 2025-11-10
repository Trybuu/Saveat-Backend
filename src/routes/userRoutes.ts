import { Router } from 'express'
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController'
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
} from '../controllers/authController'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)

router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

router.route('/').get(protect, getUsers)
router
  .route('/:id')
  .get(protect, getUser)
  .patch(protect, updateUser)
  .delete(protect, deleteUser)

export default router
