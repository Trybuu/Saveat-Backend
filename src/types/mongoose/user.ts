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
  pantryAccess: Types.ObjectId[]
  lastLogin: Date
  accountVerified: boolean
  accountVerifyToken: string
  passwordChangedAt?: Date
  passwordResetToken?: string
  passwordResetExpires?: Date
  active: boolean
}

export interface IUserInReq {
  _id: Types.ObjectId
  firstName: string
  lastName: string
  email: string
  role: IUserRole
  pantryAccess: Types.ObjectId[]
  accountVerified: boolean
  active: boolean
}
export interface IUserMethods {
  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>
  changedPasswordAfter(JWTTimestamp: number): boolean
  createPasswordResetToken(): string
  createPasswordResetCode(): string
}

export type UserModel = Model<IUser, IUserMethods>
