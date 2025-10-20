import { Router } from 'express'
import {
  getAds,
  createAd,
  getAd,
  updateAd,
  deleteAd,
} from '../controllers/adController'
const router = Router()

router.route('/').get(getAds).post(createAd)

router.route('/:id').get(getAd).patch(updateAd).delete(deleteAd)

export default router
