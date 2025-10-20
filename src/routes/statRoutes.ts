import { Router } from 'express'
import {
  getStats,
  createStat,
  getStat,
  updateStat,
  deleteStat,
} from '../controllers/statController'

const router = Router()

router.route('/').get(getStats).post(createStat)

router.route('/:id').get(getStat).patch(updateStat).delete(deleteStat)

export default router
