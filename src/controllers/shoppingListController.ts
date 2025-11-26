import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory'
import ShoppingList from '../models/shoppingList'

export const getShoppingLists = getAll(ShoppingList)
export const getShoppingList = getOne(ShoppingList)
export const createShoppingList = createOne(ShoppingList)
export const updateShoppingList = updateOne(ShoppingList)
export const deleteShoppingList = deleteOne(ShoppingList)
