import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { IUser, IUserMethods, UserModel } from '../types/user'

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  firstName: {
    type: String,
    required: [true, 'User name is required.'],
    minlength: [2, 'User name must have at least 2 characters.'],
  },
  lastName: {
    type: String,
    required: [true, 'User last name is required.'],
    minlength: [2, 'User last name must have at least 2 characters.'],
  },
  email: {
    type: String,
    required: [true, 'User email is required.'],
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'User password is required.'],
    select: false,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (el: string) {
        return el === this.password
      },
      message: 'Passwords are not the same!',
    },
  },
  accountVerified: {
    type: Boolean,
  },
  accountVerifyToken: {
    type: String,
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 14)
  this.confirmPassword = undefined

  next()
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = new Date(Date.now() - 1000)
  next()
})

userSchema.pre(/^find/, function (this: mongoose.Query<any, any>, next) {
  this.where({ active: { $ne: false } })
  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (
  JWTTimestamp: number,
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000)

    console.log(changedTimestamp)
    return JWTTimestamp < changedTimestamp
  }

  return false
}

userSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000)

  console.log({ resetToken }, this.passwordResetToken)

  return resetToken
}

const User = mongoose.model('User', userSchema)

export default User
