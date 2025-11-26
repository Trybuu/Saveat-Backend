import AppEvent from '../models/appEvent'
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory'

export const getAppEvents = getAll(AppEvent)
export const getAppEvent = getOne(AppEvent)
export const createAppEvent = createOne(AppEvent)
export const updateAppEvent = updateOne(AppEvent)
export const deleteAppEvent = deleteOne(AppEvent)
