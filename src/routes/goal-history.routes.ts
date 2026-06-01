import { Router } from 'express';
import {
  getAllHistoryByUser,
  getHistoryByGoal,
  createGoalHistory,
  deleteGoalHistory,
} from '../controllers/goal-history.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js'; // Sesuaikan middleware auth Anda
import { validate } from '../middlewares/validate.middleware.js';
import { createGoalHistorySchema } from '../dtos/goal-history.dto.js';

const router = Router();

router.use(authMiddleware);

router
  .route('/')
  .get(getAllHistoryByUser)
  .post(validate(createGoalHistorySchema), createGoalHistory);

router.route('/goal/:uuid').get(getHistoryByGoal);

router.route('/:uuid').delete(deleteGoalHistory);

export default router;
