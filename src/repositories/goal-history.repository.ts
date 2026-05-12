import { Types } from 'mongoose';
import { GoalHistoryModel, type GoalHistory } from '../models/goal-history.model.js';

export class GoalHistoryRepository {
  async findAllByGoalId(goalId: string) {
    return await GoalHistoryModel.find({ goal_id: goalId }).sort({ _id: -1 });
  }

  async findById(historyId: string) {
    if (!Types.ObjectId.isValid(historyId)) {
      return null;
    }
    return await GoalHistoryModel.findById(historyId);
  }

  async create(data: GoalHistory) {
    return await GoalHistoryModel.create(data);
  }

  async update(historyId: string, data: Partial<GoalHistory>) {
    if (!Types.ObjectId.isValid(historyId)) {
      return null;
    }
    return await GoalHistoryModel.findByIdAndUpdate(historyId, data, {
      returnDocument: 'after',
    });
  }

  async delete(historyId: string) {
    if (!Types.ObjectId.isValid(historyId)) {
      return null;
    }
    return await GoalHistoryModel.findByIdAndDelete(historyId);
  }
}
