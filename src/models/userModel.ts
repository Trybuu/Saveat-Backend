import mongoose, { Model } from 'mongoose'
import bcrypt from 'bcryptjs'

interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword?: string
}

interface IUserMethods {
  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>
}

type UserModel = Model<IUser, IUserMethods>

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
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 14)
  this.confirmPassword = undefined

  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)

export default User
