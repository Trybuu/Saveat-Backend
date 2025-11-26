import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory'
import Recipe from '../models/recipe'

export const getRecipes = getAll(Recipe)
export const getRecipe = getOne(Recipe)
export const createRecipe = createOne(Recipe)
export const updateRecipe = updateOne(Recipe)
export const deleteRecipe = deleteOne(Recipe)
