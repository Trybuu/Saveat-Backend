import mongoose, { Schema } from 'mongoose'
import { QUANTITY_UNITS } from '../config/constants'
import { IItem, IShoppingList } from '../types/mongoose/shoppingList'

const itemSchema = new mongoose.Schema<IItem>({
  addedByUserId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: {
    type: String,
    required: [true, 'Shopping Item must have a name.'],
    trim: true,
  },
  quantityAmount: {
    type: Number,
    required: [true, 'Quantity Amount is required.'],
    min: 0.01,
  },
  quantityUnit: {
    type: String,
    enum: QUANTITY_UNITS,
    required: [true, 'Quantity Unit is required.'],
  },
  isPurchased: {
    type: Boolean,
    default: false,
  },
})

const shoppingListSchema = new mongoose.Schema<IShoppingList>(
  {
    pantryId: {
      type: Schema.Types.ObjectId,
      ref: 'Pantry',
      required: true,
    },
    addedByUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: {
      type: String,
      required: [true, 'Shopping List must have a name.'],
    },
    plannedForDate: {
      type: Date,
      required: [true, 'Shopping List must have a plannedForDate.'],
    },
    items: {
      type: [itemSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'ARCHIVED'],
      default: 'ACTIVE',
      index: true,
    },
  },
  { timestamps: true },
)

shoppingListSchema.index({ pantryId: 1, status: 1 })

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema)

export default ShoppingList
