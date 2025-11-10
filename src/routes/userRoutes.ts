import { Router } from 'express'
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController'
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
} from '../controllers/authController'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)

router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

router.route('/').get(getUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router
