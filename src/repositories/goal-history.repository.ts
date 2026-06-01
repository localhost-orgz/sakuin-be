import { GoalHistoryModel, type GoalHistory } from '../models/goal-history.model.js';

export class GoalHistoryRepository {
  // Mencari semua history berdasarkan user tertentu
  async findAllByUserId(userId: string) {
    return await GoalHistoryModel.find({ user_id: userId })
      .populate('goal_id', 'name emoticon') // Menampilkan info nama & icon goal terkait
      .sort({ createdAt: -1 })
      .lean();
  }

  // Mencari semua history khusus untuk satu goal tertentu
  async findAllByGoalId(goalId: string) {
    return await GoalHistoryModel.find({ goal_id: goalId })
      .sort({ createdAt: -1 })
      .lean();
  }

  // Membuat log riwayat baru
  async create(data: GoalHistory) {
    return await GoalHistoryModel.create(data);
  }

  // Menghapus riwayat jika diperlukan
  async delete(historyId: string) {
    return await GoalHistoryModel.findOneAndDelete({ _id: historyId });
  }
}