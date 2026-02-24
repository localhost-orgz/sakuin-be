import { WalletModel, type Wallet } from '../models/wallet.model.js';

export class WalletRepository {
  async findAllByUserId(userId: string) {
    return await WalletModel.find({ user_id: userId });
  }

  async findByWalletId(walletId: string) {
    return await WalletModel.findOne({ wallet_id: walletId });
  }

  async create(data: Wallet) {
    return await WalletModel.create(data);
  }

  async update(walletId: string, data: Partial<Wallet>) {
    return await WalletModel.findOneAndUpdate({ wallet_id: walletId }, data, {
      returnDocument: 'after',
    });
  }

  async delete(walletId: string) {
    return await WalletModel.findOneAndDelete({ wallet_id: walletId });
  }
}
