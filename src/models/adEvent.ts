import mongoose, { mongo } from 'mongoose'
import { IAdEvent } from '../types/mongoose/adEvent'

const adEventSchema = new mongoose.Schema<IAdEvent>({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  eventType: {
    type: String,
    enum: ['IMPRESSION', 'CLICK'],
  },
  adId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: { countryCode: String, city: String },
    required: false,
  },
})

const AdEvent = mongoose.model('AdEvent', adEventSchema)

export default AdEvent
