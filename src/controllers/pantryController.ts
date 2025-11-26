import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory'
import Pantry from '../models/pantry'

export const getPantries = getAll(Pantry)
export const createPantry = createOne(Pantry)
export const getPantry = getOne(Pantry)
export const deletePantry = deleteOne(Pantry)
export const updatePantry = updateOne(Pantry)
