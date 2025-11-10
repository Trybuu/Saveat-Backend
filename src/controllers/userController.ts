import { Request, Response } from 'express'
import User from '../models/userModel'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import mongoose from 'mongoose'

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await User.find()

  res.status(200).json({
    status: 'success',
    message: 'Users fetched',
    data: {
      users,
    },
  })
})

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id

  if (!mongoose.Types.ObjectId.isValid(userId))
    throw new AppError('Invaid user ID format', 400)

  const user = await User.findById(userId)

  if (!user) throw new AppError('User not found', 404)

  res.status(200).json({
    status: 'success',
    message: 'User fetched',
    data: {
      user,
    },
  })
})

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id

  if (!mongoose.Types.ObjectId.isValid(userId))
    throw new AppError('Invalid user ID format', 400)

  const { email, firstName, lastName } = req.body

  const user = await User.findByIdAndUpdate(
    userId,
    { email, firstName, lastName },
    { new: true, runValidators: true },
  )

  if (!user) throw new AppError('User not found', 404)

  res.status(200).json({
    status: 'success',
    message: 'User updated',
    data: {
      user,
    },
  })
})

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id

  if (!mongoose.Types.ObjectId.isValid(userId))
    throw new AppError('Invalid user ID format', 400)

  const user = await User.findByIdAndDelete(userId)

  if (!user) throw new AppError('User not found', 404)

  res.status(204).json({
    status: 'success',
    message: 'User deleted',
  })
})
