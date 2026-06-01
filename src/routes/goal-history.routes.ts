import { Router } from 'express';
import {
  getAllHistoryByUser,
  getHistoryById, // Tambahkan controller ini untuk Read Detail
  getHistoryByGoal,
  createGoalHistory,
  updateGoalHistory, // Tambahkan controller ini untuk Update
  deleteGoalHistory,
} from '../controllers/goal-history.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createGoalHistorySchema, updateGoalHistorySchema } from '../dtos/goal-history.dto.js'; // Import update schema

const router = Router();

router.use(authMiddleware);

// Endpoint utama untuk melihat semua history milik user (Read All) & menambah history baru (Create)
router
  .route('/')
  .get(getAllHistoryByUser)
  .post(validate(createGoalHistorySchema), createGoalHistory);

// Endpoint khusus melihat list history berdasarkan Goal ID tertentu
router.route('/goal/:uuid').get(getHistoryByGoal);

// Endpoint spesifik menggunakan History ID untuk Read Detail, Update, dan Delete
router
  .route('/:uuid')
  .get(getHistoryById) // CRUD: Read Detail
  .put(validate(updateGoalHistorySchema), updateGoalHistory) // CRUD: Update penuh (menggunakan PUT)
  // jika ingin partial update, Anda bisa menggantinya atau menambahkan .patch(validate(updateGoalHistorySchema), updateGoalHistory)
  .delete(deleteGoalHistory); // CRUD: Delete

export default router;
