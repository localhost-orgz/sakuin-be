import { GoalRepository } from '../repositories/goal.repository.js';
import { GoalHistoryRepository } from '../repositories/goal-history.repository.js'; // Import repository history
import { v4 as uuid } from 'uuid';
import type { createGoalDTO, updateGoalDTO } from '../dtos/goal.dto.js';
import type { Goal } from '../models/goal.model.js';
import { Types } from 'mongoose';

export class GoalService {
  private goalRepository: GoalRepository;
  private goalHistoryRepository: GoalHistoryRepository; // Definisikan di sini

  constructor() {
    this.goalRepository = new GoalRepository();
    this.goalHistoryRepository = new GoalHistoryRepository(); // Inisialisasi
  }

  async getAllGoalsByUserId(userId: string) {
    return this.goalRepository.findAllByUserId(userId);
  }

  async getGoalByGoalId(goalId: string) {
    const goal = await this.goalRepository.findByGoalId(goalId);
    if (!goal) return null;

    const history = await this.goalHistoryRepository.findAllByGoalId(goalId);

    return {
      ...goal,
      history: history,
    };
  }

  async createGoal(data: createGoalDTO, userId: string) {
    const goalData = {
      ...data,
      user_id: new Types.ObjectId(userId),
    };
    return this.goalRepository.create(goalData);
  }

  async updateGoal(goalId: string, data: updateGoalDTO) {
    const updateData: Partial<Goal> = { ...data };
    return this.goalRepository.update(goalId, updateData);
  }

  async deleteGoal(goalId: string) {
    return this.goalRepository.delete(goalId);
  }
}