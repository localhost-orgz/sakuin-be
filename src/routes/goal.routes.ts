import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  createGoal,
  deleteGoal,
  getAllGoalsByUser,
  getGoalByGoalId,
  updateGoal,
} from '../controllers/goal.controller.js';
import { createGoalSchema, updateGoalSchema } from '../dtos/goal.dto.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getAllGoalsByUser);
router.get('/:uuid', getGoalByGoalId);
router.post('/', validate(createGoalSchema), createGoal);
router.put('/:uuid', validate(updateGoalSchema), updateGoal); 
router.delete('/:uuid', deleteGoal);

export default router;
