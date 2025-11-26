import express from 'express'
import {
  createAdEvent,
  deleteAdEvent,
  getAdEvent,
  getAdEvents,
  updateAdEvent,
} from '../controllers/adEventController'

const router = express.Router()

router.route('/').get(getAdEvents).post(createAdEvent)
router.route('/:id').get(getAdEvent).patch(updateAdEvent).delete(deleteAdEvent)

export default router
