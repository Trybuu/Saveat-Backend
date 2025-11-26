import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory'
import WasteTracking from '../models/wasteTracking'

export const getStats = getAll(WasteTracking)
export const getStat = getOne(WasteTracking)
export const createStat = createOne(WasteTracking)
export const updateStat = updateOne(WasteTracking)
export const deleteStat = deleteOne(WasteTracking)
