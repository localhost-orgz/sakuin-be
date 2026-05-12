import { Types } from 'mongoose';
import { GoalModel, type Goal } from '../models/goal.model.js';

export class GoalRepository {
  async findAllByUserId(userId: string) {
    return await GoalModel.find({ user_id: userId }).populate('currency_id');
  }

  async findByIdAndUserId(goalId: string, userId: string) {
    if (!Types.ObjectId.isValid(goalId)) {
      return null;
    }
    return await GoalModel.findOne({ _id: goalId, user_id: userId }).populate('currency_id');
  }

  async create(data: Goal) {
    return await GoalModel.create(data);
  }

  async update(goalId: string, userId: string, data: Partial<Goal>) {
    if (!Types.ObjectId.isValid(goalId)) {
      return null;
    }
    return await GoalModel.findOneAndUpdate({ _id: goalId, user_id: userId }, data, {
      returnDocument: 'after',
    });
  }

  async delete(goalId: string, userId: string) {
    if (!Types.ObjectId.isValid(goalId)) {
      return null;
    }
    return await GoalModel.findOneAndDelete({ _id: goalId, user_id: userId });
  }
}
