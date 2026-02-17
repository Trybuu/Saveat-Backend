import mongoose, { Schema, SchemaType } from 'mongoose'
import { IAccountVerificationToken } from '../types/mongoose/accountVerificationToken'

const accountVerificationTokenSchema =
  new mongoose.Schema<IAccountVerificationToken>({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userEmail: {
      type: String,
      required: [true, 'User e-mail is required.'],
      lowercase: true,
      trim: true,
    },
    token: {
      type: String,
      required: [true, 'Verification Token is required'],
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400, // Expires after 24h
    },
  })

export const AccountVerificationToken = mongoose.model(
  'AccountVerificationToken',
  accountVerificationTokenSchema,
)
