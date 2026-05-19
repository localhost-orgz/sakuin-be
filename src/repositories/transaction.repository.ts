import { TransactionModel, type Transaction } from '../models/transaction.model.js';

export class TransactionRepository {
  async findAllByUserId(userId: string) {
    return await TransactionModel.find({
      user_id: userId,
    })
    .populate('category_id')
    .populate('wallet_id')
    .sort({ date: -1, createdAt: -1 })
    .lean();
  }

  async findById(id: string) {
    return await TransactionModel.findById(id);
  }

  async create(data: Transaction) {
    return await TransactionModel.create(data);
  }

  async update(id: string, data: Partial<Transaction>) {
    return await TransactionModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });
  }

  async delete(id: string) {
    return await TransactionModel.findByIdAndDelete(id);
  }

  async getSummaryByPeriod(userId: string, startDate: Date, endDate: Date) {
    const result = await TransactionModel.aggregate([
      {
        $match: {
          user_id: userId,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$type',
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    const summary = { income: 0, expense: 0 };
    result.forEach((item) => {
      if (item._id === 'income' || item._id === 'expense') {
        summary[item._id as 'income' | 'expense'] = item.totalAmount;
      }
    });

    return summary;
  }
}
