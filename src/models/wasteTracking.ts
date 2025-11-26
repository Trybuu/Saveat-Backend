import mongoose, { Schema } from 'mongoose'
import IWasteTracking from '../types/mongoose/wasteTracking'

const wasteTrackingSchema = new mongoose.Schema<IWasteTracking>(
  {
    pantryId: {
      type: Schema.Types.ObjectId,
      ref: 'Pantry',
      required: true,
    },
    wastedFoodGrams: {
      type: Number,
      min: 0,
      default: 0,
    },
    savedFoodGrams: {
      type: Number,
      min: 0,
      default: 0,
    },
    boughtProductsQuantity: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true },
)

wasteTrackingSchema.index({ pantryId: 1, date: 1 }, { unique: true })

const WasteTracking = mongoose.model('WasteTracking', wasteTrackingSchema)

export default WasteTracking
