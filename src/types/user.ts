import { Model, Types } from 'mongoose'

export type IUserRole = 'user' | 'moderator' | 'admin'

export interface IUser {
  _id: Types.ObjectId
  firstName: string
  lastName: string
  email: string
  role: IUserRole
  password: string
  confirmPassword?: string
  accountVerified: boolean
  accountVerifyToken: string
  passwordChangedAt?: Date
  passwordResetToken?: string
  passwordResetExpires?: Date
  active: boolean
}

export interface IUserMethods {
  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>
  changedPasswordAfter(JWTTimestamp: number): boolean
  createPasswordResetToken(): string
}

export type UserModel = Model<IUser, IUserMethods>
