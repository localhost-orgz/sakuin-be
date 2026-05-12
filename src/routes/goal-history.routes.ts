import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  createGoalHistory,
  deleteGoalHistory,
  getHistoriesByGoalId,
  getHistoryById,
  updateGoalHistory,
} from '../controllers/goal-history.controller.js';
import { createGoalHistorySchema, updateGoalHistorySchema } from '../dtos/goal-history.dto.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/by-goal/:goalId', getHistoriesByGoalId);
router.post('/', validate(createGoalHistorySchema), createGoalHistory);
router.get('/:id', getHistoryById);
router.put('/:id', validate(updateGoalHistorySchema), updateGoalHistory);
router.delete('/:id', deleteGoalHistory);

export default router;
