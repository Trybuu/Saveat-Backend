import { Router } from 'express'
import {
  getPantries,
  createPantry,
  getPantry,
  updatePantry,
  deletePantry,
} from '../controllers/pantryController'

const router = Router()

router.route('/').get(getPantries).post(createPantry)
router.route('/:id').get(getPantry).patch(updatePantry).delete(deletePantry)

export default router
