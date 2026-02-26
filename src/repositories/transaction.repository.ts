import { TransactionModel, type Transaction } from '../models/transaction.model.js';

export class TransactionRepository {
  async findAllByUserId(userId: string) {
    return await TransactionModel.find({
      user_id: userId,
    });
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
}
