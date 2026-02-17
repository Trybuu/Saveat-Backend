import { Document, Types } from 'mongoose'

export interface IAccountVerificationToken extends Document {
  userId: Types.ObjectId
  userEmail: string
  token: string
  createdAt: Date
}
