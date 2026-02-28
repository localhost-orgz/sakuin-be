import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  getAllCurrencies,
  getCurrencyByCode,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} from '../controllers/currency.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createCurrencySchema, updateCurrencySchema } from '../dtos/currency.dto.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getAllCurrencies);
router.get('/:code', getCurrencyByCode);
router.post('/', validate(createCurrencySchema), createCurrency);
router.put('/:code', validate(updateCurrencySchema), updateCurrency);
router.delete('/:code', deleteCurrency);

export default router;
