import { Router } from 'express'
import {
  getFoodSupplies,
  createFoodSupply,
  getFoodSupply,
  updateFoodSupply,
  deleteFoodSupply,
} from '../controllers/foodSupplyController'

const router = Router()

router.route('/').get(getFoodSupplies).post(createFoodSupply)
router
  .route('/:id')
  .get(getFoodSupply)
  .patch(updateFoodSupply)
  .delete(deleteFoodSupply)

export default router
