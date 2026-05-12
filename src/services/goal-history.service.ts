import { Types } from 'mongoose';
import type { createGoalHistoryDTO, updateGoalHistoryDTO } from '../dtos/goal-history.dto.js';
import { GoalHistoryRepository } from '../repositories/goal-history.repository.js';
import { GoalRepository } from '../repositories/goal.repository.js';

export class GoalHistoryService {
  private goalHistoryRepository: GoalHistoryRepository;
  private goalRepository: GoalRepository;

  constructor() {
    this.goalHistoryRepository = new GoalHistoryRepository();
    this.goalRepository = new GoalRepository();
  }

  async getHistoriesByGoalId(goalId: string, userId: string) {
    const goal = await this.goalRepository.findByIdAndUserId(goalId, userId);
    if (!goal) {
      return null;
    }
    return this.goalHistoryRepository.findAllByGoalId(goalId);
  }

  async getHistoryById(historyId: string, userId: string) {
    const history = await this.goalHistoryRepository.findById(historyId);
    if (!history) {
      return null;
    }
    const goalId = history.goal_id?.toString();
    if (!goalId) {
      return null;
    }
    const goal = await this.goalRepository.findByIdAndUserId(goalId, userId);
    if (!goal) {
      return null;
    }
    return history;
  }

  async createHistory(data: createGoalHistoryDTO, userId: string) {
    const goal = await this.goalRepository.findByIdAndUserId(data.goal_id, userId);
    if (!goal) {
      return null;
    }

    // Update current_amount in Goal depending on history type
    let newAmount = goal.current_amount;
    if (data.type === 'Deposit') {
      newAmount += data.amount;
    } else if (data.type === 'Withdrawal') {
      newAmount -= data.amount;
    }

    // Update the goal's current_amount
    await this.goalRepository.update(goal._id.toString(), userId, { current_amount: newAmount });

    // Create the goal history
    return this.goalHistoryRepository.create({
      goal_id: new Types.ObjectId(data.goal_id),
      amount: data.amount,
      type: data.type,
      created_at: new Date(),
    });
  }

  async updateHistory(historyId: string, userId: string, data: updateGoalHistoryDTO) {
    const existing = await this.getHistoryById(historyId, userId);
    if (!existing) {
      return null;
    }

    // Get the goal
    const goalId = existing.goal_id?.toString();
    if (!goalId) {
      return null;
    }
    const goal = await this.goalRepository.findByIdAndUserId(goalId, userId);
    if (!goal) {
      return null;
    }

    // adjustment for goal.current_amount if amount/type changed
    let newCurrentAmount = goal.current_amount;

    // original values
    const originalAmount = existing.amount;
    const originalType = existing.type;
    // incoming values, fallback to existing if not provided
    const updatedAmount = data.amount !== undefined ? data.amount : originalAmount;
    const updatedType = data.type !== undefined ? data.type : originalType;

    if (originalType === 'Deposit') {
      newCurrentAmount -= originalAmount;
    } else if (originalType === 'Withdrawal') {
      newCurrentAmount += originalAmount;
    }

    // Apply new effect
    if (updatedType === 'Deposit') {
      newCurrentAmount += updatedAmount;
    } else if (updatedType === 'Withdrawal') {
      newCurrentAmount -= updatedAmount;
    }

    // Update goal.current_amount if changed
    if (newCurrentAmount !== goal.current_amount) {
      await this.goalRepository.update(goalId, userId, { current_amount: newCurrentAmount });
    }

    // Update the goal history entry
    return this.goalHistoryRepository.update(historyId, data);
  }

  async deleteHistory(historyId: string, userId: string) {
    const existing = await this.getHistoryById(historyId, userId);
    if (!existing) {
      return null;
    }
    return this.goalHistoryRepository.delete(historyId);
  }
}
