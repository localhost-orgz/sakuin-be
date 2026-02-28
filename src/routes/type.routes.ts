import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  getAllTypes,
  getTypeBySlug,
  createType,
  updateType,
  deleteType,
} from '../controllers/type.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createTypeSchema, updateTypeSchema } from '../dtos/type.dto.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getAllTypes);
router.get('/:slug', getTypeBySlug);
router.post('/', validate(createTypeSchema), createType);
router.put('/:slug', validate(updateTypeSchema), updateType);
router.delete('/:slug', deleteType);

export default router;
