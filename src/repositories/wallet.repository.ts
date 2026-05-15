import { TransactionModel } from '../models/transaction.model.js';
import { WalletModel, type Wallet } from '../models/wallet.model.js';

export class WalletRepository {
  static updateBalance: any;
  async findAllByUserId(userId: string) {
    return await WalletModel.find({ user_id: userId });
  }

  async findByWalletId(walletId: string) {
    const wallet = await WalletModel.findOne({ _id: walletId }).populate('currency_id').lean();
    const transactions = await TransactionModel.find({ wallet_id: wallet?._id }).sort({ date: -1 });

    return {
      ...wallet,
      transactions
    };
  }

  async create(data: Wallet) {
    return await WalletModel.create(data);
  }

  async update(walletId: string, data: Partial<Wallet>) {
    return await WalletModel.findOneAndUpdate({ _id: walletId }, data, {
      returnDocument: 'after',
    });
  }

  async delete(walletId: string) {
    return await WalletModel.findOneAndDelete({ _id: walletId });
  }

  async updateBalance(walletId: string, amountChange: number) {
    return await WalletModel.findByIdAndUpdate(
      walletId,
      { $inc: { balance: amountChange } },
      { new: true }
    );
  }
}
