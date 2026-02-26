import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  getAllTransactionsByUser,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transaction.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createTransactionSchema, updateTransactionSchema } from '../dtos/transaction.dto.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getAllTransactionsByUser);
router.get('/:id', getTransactionById);
router.post('/', validate(createTransactionSchema), createTransaction);
router.put('/:id', validate(updateTransactionSchema), updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
