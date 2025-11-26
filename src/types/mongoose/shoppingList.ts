import { Types } from 'mongoose'

export interface IItem {
  addedByUserId: Types.ObjectId
  name: string
  quantityAmount: number
  quantityUnit: string
  isPurchased: boolean
}

export interface IShoppingList {
  pantryId: Types.ObjectId
  addedByUserId: Types.ObjectId
  name: string
  plannedForDate: Date
  items: IItem[] | []
  status: string
}
