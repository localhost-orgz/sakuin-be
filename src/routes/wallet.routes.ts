import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  createWallet,
  deleteWallet,
  getAllWalletsByUser,
  getWalletByWalletId,
  updateWallet,
} from '../controllers/wallet.controller.js';
import { createWalletSchema, updateWalletSchema } from '../dtos/wallet.dto.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getAllWalletsByUser);
router.get('/:uuid', getWalletByWalletId);
router.post('/', validate(createWalletSchema), createWallet);
router.put('/:uuid', validate(updateWalletSchema), updateWallet);
router.delete('/:uuid', deleteWallet);

export default router;
