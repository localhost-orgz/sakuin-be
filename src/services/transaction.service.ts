import { TransactionRepository } from '../repositories/transaction.repository.js';
import type { CreateTransactionDTO, UpdateTransactionDTO } from '../dtos/transaction.dto.js';
import { WalletRepository } from '../repositories/wallet.repository.js';
import { Types } from 'mongoose';

export class TransactionService {
  private transactionRepo: TransactionRepository;
  private walletRepo: WalletRepository;

  constructor() {
    this.transactionRepo = new TransactionRepository();
    this.walletRepo = new WalletRepository();
  }

  async getAllTransactionsByUserId(userId: string) {
    return await this.transactionRepo.findAllByUserId(userId);
  }

  async getTransactionById(id: string) {
    return await this.transactionRepo.findById(id);
  }

  async createTransaction(userId: string, data: CreateTransactionDTO) {
    const now = new Date();
    const transactionData = await this.transactionRepo.create({
      ...data,
      user_id: new Types.ObjectId(userId),
      category_id: new Types.ObjectId(data.category_id),
      wallet_id: new Types.ObjectId(data.wallet_id),
      amount: Number(data.amount),
      createdAt: now,
      updatedAt: now,
    });

    const balanceAdjustment = data.type === 'income' ? Number(data.amount) : -Number(data.amount);
    await this.walletRepo.updateBalance(data.wallet_id, balanceAdjustment);

    return transactionData;
  }

  async updateTransaction(id: string, data: UpdateTransactionDTO) {
    const updatedData = {
      ...data,
      category_id: new Types.ObjectId(data.category_id),
      wallet_id: new Types.ObjectId(data.wallet_id),
      amount: Number(data.amount),
      updatedAt: new Date(),
    };
    return await this.transactionRepo.update(id, updatedData);
  }

  async deleteTransaction(id: string) {
    return await this.transactionRepo.delete(id);
  }
}
