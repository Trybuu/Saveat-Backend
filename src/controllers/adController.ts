import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory'
import Ad from '../models/ad'

export const getAds = getAll(Ad)
export const getAd = getOne(Ad)
export const createAd = createOne(Ad)
export const updateAd = updateOne(Ad)
export const deleteAd = deleteOne(Ad)
