import { Router } from 'express'
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  deleteMe,
} from '../controllers/userController'
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  restrictTo,
} from '../controllers/authController'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)

router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

router.delete('/deleteMe', protect, deleteMe)

router
  .route('/')
  .get(protect, restrictTo('user', 'admin', 'moderator'), getUsers)
router
  .route('/:id')
  .get(protect, restrictTo('user', 'admin', 'moderator'), getUser)
  .patch(protect, restrictTo('admin'), updateUser)
  .delete(protect, restrictTo('admin'), deleteUser)

export default router
