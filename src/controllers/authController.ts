import { Request, Response } from 'express'
import jwt, { SignOptions } from 'jsonwebtoken'
import User from '../models/userModel'

const signToken = (id: string): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET must be defined')

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ||
      '7d') as jwt.SignOptions['expiresIn'],
  }

  return jwt.sign({ id }, secret, options)
}

export const signup = async (req: Request, res: Response) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  })

  res.status(201).json({
    status: 'success',
    message: 'User signed up',
    data: {
      user: newUser,
    },
  })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password',
    })
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password',
    })
  }

  const token = signToken(String(user._id))

  res.status(200).json({
    status: 'success',
    message: 'User logged in',
    token,
  })
}
