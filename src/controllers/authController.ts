import { NextFunction, Request, Response } from 'express'
import crypto from 'crypto'
import jwt, { SignOptions } from 'jsonwebtoken'
import { IUser, IUserRole } from '../types/mongoose/user'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { JWTPayload } from '../types/auth'
import User from '../models/user'
import sendEmail from '../utils/email'
import { AccountVerificationToken } from '../models/accountVerficationToken'

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
    path: '/',
    sameSite: 'lax',
  })

  res.status(statusCode).json({
    status: 'success',
    message: 'User logged in',
    data: {
      userId: user._id,
      token,
    },
  })
}

export const verifyAccount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params

    const storedToken = await AccountVerificationToken.findOne({ token })

    if (!storedToken) {
      return next(new AppError('Token jest nieprawidłowy lub wygasł.', 400))
    }

    const user = await User.findByIdAndUpdate(
      storedToken.userId,
      { accountVerified: true },
      { new: true, runValidators: true },
    )

    if (!user) {
      return next(
        new AppError(
          'Nie znaleziono użytkownika przypisanego do tego tokena.',
          404,
        ),
      )
    }

    await AccountVerificationToken.deleteOne({ _id: storedToken._id })

    res.status(200).json({
      status: 'success',
      message:
        'Konto zostało pomyślnie zweryfikowane! Możesz się teraz zalogować.',
    })
  },
)

const createTokenAndSendEmail = async (user: any, req: Request) => {
  const tokenData = await AccountVerificationToken.findOne({
    userEmail: user.email,
  })
  let verificationToken: string

  if (!tokenData) {
    verificationToken = crypto.randomBytes(32).toString('hex')

    await AccountVerificationToken.create({
      userId: user._id,
      userEmail: user.email,
      token: verificationToken,
    })
  } else {
    verificationToken = tokenData.token
  }

  const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/users/verify/${verificationToken}`
  const message = `Witaj ${user.firstName}!\nBardzo dziękujemy za założenie konta w Saveat! Kliknij w poniższy link aby aktywować konto:\n\n${verificationUrl}\n\nLink wygaśnie za 24 godziny.`

  await sendEmail({
    to: user.email,
    subject: 'Weryfikacja konta Saveat',
    text: message,
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

  await createTokenAndSendEmail(newUser, req)

  res.status(201).json({
    status: 'success',
    message: 'User signed up. Please check your email to verify your account.',
    data: {
      user: newUser,
    },
  })
})

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!email || !password)
      return next(new AppError('Please provide email and password', 400))

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401))
    }

    if (!user.accountVerified) {
      await createTokenAndSendEmail(user, req)

      return next(
        new AppError(
          'Account is not verified. New verification link have been sent, please check your email.',
          403,
        ),
      )
    }

    createAndSendToken(user, 201, res)
  },
)

export const logout = catchAsync(async (req: Request, res: Response) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
  })

  res.status(200).json({ status: 'success', message: 'Logout successed' })
})

export const protect = catchAsync(
  async (
    req: Request & { user?: IUser },
    res: Response,
    next: NextFunction,
  ) => {
    let token: string | undefined = undefined

    console.log(req.cookies)

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt
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

    // const resetToken = user.createPasswordResetToken()
    const resetCode = user.createPasswordResetCode()
    await user.save({ validateBeforeSave: false })

    const message = `
    Witaj ${user.firstName}!
    
    Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta w aplikacji Saveat.

    Twój kod weryfikacyjny to:
    ${resetCode}

    Wpisz powyższy kod w aplikacji, aby kontynuować proces zmiany hasła. 
    Kod jest ważny przez najbliższe 15 minut.

    Jeśli to nie Ty prosiłeś o zmianę hasła, po prostu zignoruj tę wiadomość. Twoje hasło pozostanie bezpieczne.

    Zespół Saveat
    `

    try {
      await sendEmail({
        to: user.email,
        subject: 'Twój token do zresetowania hasła - Saveat',
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
    const { code, password, confirmPassword } = req.body

    console.log(req.body)

    if (!code) {
      return next(new AppError('You need to provide reset code', 400))
    }

    const hashedToken = crypto.createHash('sha256').update(code).digest('hex')

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    })

    console.log(user)

    if (!user) return next(new AppError('Token is invalid or is expired', 400))

    user.password = password
    user.confirmPassword = confirmPassword
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()

    res.status(200).json({
      status: 'success',
      message: 'Password has been changed!',
    })
  },
)
