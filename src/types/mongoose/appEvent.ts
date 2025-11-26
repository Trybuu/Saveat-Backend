import { Types } from 'mongoose'

export interface IAppEvent {
  timestamp: Date
  eventType: string
  userId: Types.ObjectId
  sessionId: string
  device?: string
  location?: {
    countryCode: string
    city: string
  }
  metadata?: Record<string, any>
}
