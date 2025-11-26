import { Types } from 'mongoose'

interface IWasteTracking {
  pantryId: Types.ObjectId
  wastedFoodGrams: Number
  savedFoodGrams: Number
  boughtProductsQuantity: Number
}

export default IWasteTracking
