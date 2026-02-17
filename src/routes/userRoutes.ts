import { Router } from 'express'
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  deleteMe,
} from '../controllers/userController'
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  restrictTo,
  logout,
  verifyAccount,
} from '../controllers/authController'
import {
  createUserPantry,
  getUserPantries,
} from '../controllers/pantryController'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

router.get('/verify/:token', verifyAccount)

router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword', resetPassword)

router.get('/me', protect, getMe)
router.delete('/deleteMe', protect, deleteMe)

router
  .route('/pantry')
  .get(protect, restrictTo('user', 'admin', 'moderator'), getUserPantries)
  .post(protect, restrictTo('user', 'admin', 'moderator'), createUserPantry)

router
  .route('/')
  .get(protect, restrictTo('user', 'admin', 'moderator'), getUsers)
router
  .route('/:id')
  .get(protect, restrictTo('user', 'admin', 'moderator'), getUser)
  .patch(protect, restrictTo('admin'), updateUser)
  .delete(protect, restrictTo('admin'), deleteUser)

export default router
