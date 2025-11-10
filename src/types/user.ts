import { Model } from 'mongoose'

export type IUserRoles = 'user' | 'moderator' | 'admin'

export interface IUser {
  firstName: string
  lastName: string
  email: string
  role: IUserRoles
  password: string
  confirmPassword?: string
  accountVerified: boolean
  accountVerifyToken: string
  passwordChangedAt?: Date
  passwordResetToken?: string
  passwordResetExpires?: Date
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
