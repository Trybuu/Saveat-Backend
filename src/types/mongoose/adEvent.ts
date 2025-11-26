import { Types } from 'mongoose'

export interface IAdEvent {
  timestamp: Date
  eventType: string
  adId: Types.ObjectId
  userId: Types.ObjectId
  location?: {
    countryCode: string
    city: string
  }
}
