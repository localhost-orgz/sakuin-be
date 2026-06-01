import { GoalHistoryModel, type GoalHistory } from '../models/goal-history.model.js';

export class GoalHistoryRepository {
  async findAllByUserId(userId: string) {
    return await GoalHistoryModel.find({ user_id: userId })
      .populate('goal_id', 'name emoticon')
      .sort({ createdAt: -1 })
      .lean();
  }

  // Tambahan untuk detail Read
  async findById(historyId: string) {
    return await GoalHistoryModel.findById(historyId).lean();
  }

  async findAllByGoalId(goalId: string) {
    return await GoalHistoryModel.find({ goal_id: goalId })
      .sort({ createdAt: -1 })
      .lean();
  }

  // Menggunakan tipe data 'any' atau any yang valid karena 'amount' sudah ditransformasi dari string ke number oleh Zod
  async create(data: any) {
    return await GoalHistoryModel.create(data);
  }

  // Tambahan untuk Update
  async update(historyId: string, data: any) {
    return await GoalHistoryModel.findOneAndUpdate({ _id: historyId }, data, {
      new: true, // Mengembalikan data yang sudah diperbarui
    }).lean();
  }

  async delete(historyId: string) {
    return await GoalHistoryModel.findOneAndDelete({ _id: historyId });
  }
}