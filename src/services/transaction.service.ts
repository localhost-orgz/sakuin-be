import { TransactionRepository } from '../repositories/transaction.repository.js';
import type { CreateTransactionDTO, UpdateTransactionDTO } from '../dtos/transaction.dto.js';
import { Types } from 'mongoose';

export class TransactionService {
  private transactionRepo: TransactionRepository;

  constructor() {
    this.transactionRepo = new TransactionRepository();
  }

  async getAllTransactionsByUserId(userId: string) {
    return await this.transactionRepo.findAllByUserId(userId);
  }

  async getTransactionById(id: string) {
    return await this.transactionRepo.findById(id);
  }

  async createTransaction(userId: string, data: CreateTransactionDTO) {
    const now = new Date();
    const transactionData = {
      ...data,
      user_id: new Types.ObjectId(userId),
      category_id: new Types.ObjectId(data.category_id),
      wallet_id: new Types.ObjectId(data.wallet_id),
      createdAt: now,
      updatedAt: now,
    };
    return await this.transactionRepo.create(transactionData);
  }

  async updateTransaction(id: string, data: UpdateTransactionDTO) {
    const updatedData = {
      ...data,
      category_id: new Types.ObjectId(data.category_id),
      wallet_id: new Types.ObjectId(data.wallet_id),
      updatedAt: new Date(),
    };
    return await this.transactionRepo.update(id, updatedData);
  }

  async deleteTransaction(id: string) {
    return await this.transactionRepo.delete(id);
  }
}
