import mongoose, { Schema } from 'mongoose'
import { QUANTITY_UNITS } from '../config/constants'
import type IPantry from '../types/mongoose/pantry'

const pantrySchema = new mongoose.Schema<IPantry>({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    minLength: 3,
    required: [true, 'Pantry name must be defined!'],
  },
  description: {
    type: String,
    maxLength: 50,
  },
  usersAccess: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  },
  supplies: {
    type: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantityValue: {
          type: Number,
          min: 0,
          required: [true, 'Quantity must be specified!'],
        },
        quantityUnit: {
          type: String,
          enum: QUANTITY_UNITS,
          required: [true, 'Quantity Unit must be specified!'],
        },
        creationDate: Date,
        expirationDate: Date,
      },
    ],
    default: [],
  },
})

const Pantry = mongoose.model('Pantry', pantrySchema)

export default Pantry
