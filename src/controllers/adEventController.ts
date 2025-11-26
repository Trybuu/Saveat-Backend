import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory'
import AdEvent from '../models/adEvent'

export const getAdEvents = getAll(AdEvent)
export const getAdEvent = getOne(AdEvent)
export const createAdEvent = createOne(AdEvent)
export const updateAdEvent = updateOne(AdEvent)
export const deleteAdEvent = deleteOne(AdEvent)
