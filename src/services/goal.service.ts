import { Types } from 'mongoose';
import type { createGoalDTO, updateGoalDTO } from '../dtos/goal.dto.js';
import type { Goal } from '../models/goal.model.js';
import { GoalRepository } from '../repositories/goal.repository.js';

export class GoalService {
  private goalRepository: GoalRepository;

  constructor() {
    this.goalRepository = new GoalRepository();
  }

  async getAllGoalsByUserId(userId: string) {
    return this.goalRepository.findAllByUserId(userId);
  }

  async getGoalById(goalId: string, userId: string) {
    return this.goalRepository.findByIdAndUserId(goalId, userId);
  }

  async createGoal(data: createGoalDTO, userId: string) {
    const goalData = {
      ...data,
      user_id: new Types.ObjectId(userId),
      currency_id: new Types.ObjectId(data.currency_id),
    };
    return this.goalRepository.create(goalData);
  }

  async updateGoal(goalId: string, userId: string, data: updateGoalDTO) {
    const { currency_id, ...rest } = data;
    const updateData: Partial<Goal> = { ...rest };
    if (currency_id != null) {
      updateData.currency_id = new Types.ObjectId(currency_id);
    }
    return this.goalRepository.update(goalId, userId, updateData);
  }

  async deleteGoal(goalId: string, userId: string) {
    return this.goalRepository.delete(goalId, userId);
  }
}
