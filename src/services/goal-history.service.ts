import { GoalHistoryRepository } from '../repositories/goal-history.repository.js';
import type { createGoalHistoryDTO, updateGoalHistoryDTO } from '../dtos/goal-history.dto.js';
import { Types } from 'mongoose';

export class GoalHistoryService {
  private historyRepository: GoalHistoryRepository;

  constructor() {
    this.historyRepository = new GoalHistoryRepository();
  }

  async getHistoryByUserId(userId: string) {
    return this.historyRepository.findAllByUserId(userId);
  }

  // Tambahan Read Detail
  async getHistoryById(historyId: string) {
    return this.historyRepository.findById(historyId);
  }

  async getHistoryByGoalId(goalId: string) {
    return this.historyRepository.findAllByGoalId(goalId);
  }

  async createHistory(data: createGoalHistoryDTO, userId: string) {
    const historyData = {
      ...data,
      goal_id: new Types.ObjectId(data.goal_id),
      user_id: new Types.ObjectId(userId),
    };
    return this.historyRepository.create(historyData);
  }

  // Tambahan Update Logika
  async updateHistory(historyId: string, data: updateGoalHistoryDTO) {
    const updateData: any = { ...data };
    if (data.goal_id) {
      updateData.goal_id = new Types.ObjectId(data.goal_id);
    }
    return this.historyRepository.update(historyId, updateData);
  }

  async deleteHistory(historyId: string) {
    return this.historyRepository.delete(historyId);
  }
}