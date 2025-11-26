import mongoose, { mongo } from 'mongoose'
import { APP_EVENT_TYPES } from '../config/constants'
import { IAppEvent } from '../types/mongoose/appEvent'

const appEventSchema = new mongoose.Schema<IAppEvent>({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
    index: true,
  },
  eventType: {
    type: String,
    enum: APP_EVENT_TYPES,
    required: [true, 'Event type is required.'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  device: {
    type: String, // Np. 'iOS', 'Android', 'Web'
    index: true,
  },
  location: {
    type: { countryCode: String, city: String },
    required: false,
  },

  // Elastyczne pole dla danych specyficznych dla zdarzenia
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
})

const AppEvent = mongoose.model('AppEvent', appEventSchema)

export default AppEvent
