import express from 'express'
import {
  createAppEvent,
  deleteAppEvent,
  getAppEvents,
  updateAppEvent,
} from '../controllers/appEventController'

const router = express.Router()

router.route('/').get(getAppEvents).post(createAppEvent)
router
  .route('/:id')
  .get(getAppEvents)
  .patch(updateAppEvent)
  .delete(deleteAppEvent)

export default router
