import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory'
import Pantry from '../models/pantry'
import catchAsync from '../utils/catchAsync'
import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError'
import { IUser } from '../types/mongoose/user'
import { RequestCustom } from '../types/express'
import mongoose, { Types } from 'mongoose'

export const getPantries = getAll(Pantry)
export const createPantry = createOne(Pantry)
export const getPantry = getOne(Pantry)
export const deletePantry = deleteOne(Pantry)
export const updatePantry = updateOne(Pantry)

// Client API endpoints controllers
export const getUserPantries = catchAsync(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('User not authenticated', 401))
    }

    const userId: Types.ObjectId = new mongoose.Types.ObjectId(req.user._id)

    const pantries = await Pantry.find({
      $or: [{ ownerId: userId }, { usersAccess: userId }],
    }).populate({
      path: 'ownerId',
      select: 'firstName lastName',
    })

    res.status(200).json({
      status: 'success',
      results: pantries.length,
      data: {
        data: pantries,
      },
    })
  },
)

export const createUserPantry = catchAsync(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('User not authenticated', 401))
    }

    const userId: Types.ObjectId = new mongoose.Types.ObjectId(req.user._id)

    const newUserPantry = await Pantry.create({
      ownerId: userId,
      name: req.body.pantryName,
      description: req.body.pantryDescription,
    })

    res.status(200).json({
      status: 'success',
      data: {
        data: newUserPantry,
      },
    })
  },
)
