import { Router } from 'express'
import {
  getShoppingLists,
  createShoppingList,
  getShoppingList,
  updateShoppingList,
  deleteShoppingList,
} from '../controllers/shoppingListController'

const router = Router()

router.route('/').get(getShoppingLists).post(createShoppingList)

router
  .route('/:id')
  .get(getShoppingList)
  .patch(updateShoppingList)
  .delete(deleteShoppingList)

export default router
