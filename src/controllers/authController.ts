import { NextFunction, Request, Response } from 'express'
import crypto from 'crypto'
import jwt, { SignOptions } from 'jsonwebtoken'
import { IUser, IUserRole } from '../types/user'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { JWTPayload } from '../types/auth'
import User from '../models/userModel'
import sendEmail from '../utils/email'

const signToken = (id: string): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET must be defined')

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ||
      '7d') as jwt.SignOptions['expiresIn'],
  }

  return jwt.sign({ id }, secret, options)
}

const createAndSendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = signToken(String(user._id))

  const jwtCookieExpiresInNumber = Number(process.env.JWT_COOKIE_EXPIRES_IN)
  const nodeEnv = process.env.NODE_ENV

  if (!jwtCookieExpiresInNumber || !nodeEnv)
    throw new AppError(
      'Missing JWT configuration in environment variables',
      500,
    )

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + jwtCookieExpiresInNumber * 24 * 60 * 60 * 1000,
    ),
    secure: nodeEnv === 'production',
    httpOnly: true,
  })

  res.status(statusCode).json({
    status: 'success',
    message: 'User logged in',
  })
}

export const signup = catchAsync(async (req: Request, res: Response) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    accountVerified: false,
  })

  if (!newUser) return new AppError('Error creating user', 500)

  res.status(201).json({
    status: 'success',
    message: 'User signed up',
    data: {
      user: newUser,
    },
  })
})

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password)
    throw new AppError('Please provide email and password', 400)

  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError('Incorrect email or password', 401)
  }

  createAndSendToken(user, 201, res)
})

export const protect = catchAsync(
  async (
    req: Request & { user?: IUser },
    res: Response,
    next: NextFunction,
  ) => {
    let token: string | undefined = undefined

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return next(
        new AppError(
          'You are not logged in! Please log in to get access.',
          401,
        ),
      )
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload

    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
      return next(
        new AppError('The user belonging to the token no longer exists.', 401),
      )
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          'User recently changed password! Please log in again.',
          401,
        ),
      )
    }

    req.user = currentUser
    next()
  },
)

export const restrictTo = (...roles: IUserRole[]) => {
  return async (req: any, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new AppError('You are not logged in. Log in and try again', 403),
      )
    }
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      )
    }

    next()
  }
}

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return next(new AppError('USER_NOT_FOUND', 404))
    }

    const resetToken = user.createPasswordResetToken()

    await user.save({ validateBeforeSave: false })

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`
    const message = `Forgot your password? Submit a PATCH request with your new password and confirmPassword to ${resetUrl}\nIf you didn't forget your password please ignore this email.`

    try {
      await sendEmail({
        to: user.email,
        subject: 'Your password reset token',
        text: message,
      })

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      })
    } catch (err) {
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined

      await user.save({ validateBeforeSave: false })

      console.log(err)

      return next(
        new AppError(
          'There was an error sending the email. Please try again.',
          500,
        ),
      )
    }
  },
)

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex')

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    })

    if (!user) return next(new AppError('Token is invalid or is expired', 400))

    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()

    res.status(200).json({
      status: 'success',
    })
  },
)
