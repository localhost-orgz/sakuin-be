import { GoalModel, type Goal } from '../models/goal.model.js';

export class GoalRepository {
  async findAllByUserId(userId: string) {
    return await GoalModel.find({ user_id: userId }).lean();
  }

  async findByGoalId(goalId: string) {
    return await GoalModel.findOne({ _id: goalId }).lean();
  }

  async create(data: Goal) {
    return await GoalModel.create(data);
  }

  async update(goalId: string, data: Partial<Goal>) {
    return await GoalModel.findOneAndUpdate({ _id: goalId }, data, {
      returnDocument: 'after',
    });
  }

  async delete(goalId: string) {
    return await GoalModel.findOneAndDelete({ _id: goalId });
  }
}
