import { Router } from 'express'
import {
  getRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} from '../controllers/recipeController'

const router = Router()

router.route('/').get(getRecipes).post(createRecipe)
router.route('/:id').get(getRecipe).patch(updateRecipe).delete(deleteRecipe)

export default router
