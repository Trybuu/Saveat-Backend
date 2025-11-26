import mongoose from 'mongoose'
import { ADS_PRIORITIES, ADS_SECTIONS } from '../config/constants'
import { IAd } from '../types/mongoose/ad'

const adSchema = new mongoose.Schema<IAd>(
  {
    companyName: {
      type: String,
      required: [true, 'Company Name must be defined.'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Addvertistment must have an image.'],
    },
    targetUrl: {
      type: String,
      required: [true, 'Addvertistment must have target url specified.'],
    },
    adSection: {
      type: String,
      enum: ADS_SECTIONS,
      required: true,
    },
    priorityLevel: {
      type: String,
      enum: ADS_PRIORITIES,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    stats: {
      totalImpressions: {
        type: Number,
        default: 0,
      },
      totalClicks: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true },
)

const Ad = mongoose.model('Ad', adSchema)

export default Ad
