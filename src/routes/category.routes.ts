import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  getAllCategoriesByUser,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createCategorySchema, updateCategorySchema } from '../dtos/category.dto.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getAllCategoriesByUser);
router.get('/:slug', getCategoryBySlug);
router.post('/', validate(createCategorySchema), createCategory);
router.put('/:slug', validate(updateCategorySchema), updateCategory);
router.delete('/:slug', deleteCategory);

export default router;
