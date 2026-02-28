import { WalletRepository } from '../repositories/wallet.repository.js';
import { v4 as uuid } from 'uuid';
import type { createWalletDTO, updateWalletDTO } from '../dtos/wallet.dto.js';
import type { Wallet } from '../models/wallet.model.js';
import { Types } from 'mongoose';

export class WalletService {
  private walletRepository: WalletRepository;

  constructor() {
    this.walletRepository = new WalletRepository();
  }

  async getAllWalletsByUserId(userId: string) {
    return this.walletRepository.findAllByUserId(userId);
  }

  async getWalletByWalletId(walletId: string) {
    return this.walletRepository.findByWalletId(walletId);
  }

  async createWallet(data: createWalletDTO, userId: string) {
    const walletData = {
      ...data,
      user_id: new Types.ObjectId(userId),
      currency_id: new Types.ObjectId(data.currency_id),
      type_id: new Types.ObjectId(data.type_id),
      wallet_id: uuid(),
    };
    return this.walletRepository.create(walletData);
  }

  async updateWallet(walletId: string, data: updateWalletDTO) {
    const { currency_id, type_id, ...rest } = data;
    const updateData: Partial<Wallet> = { ...rest };
    if (currency_id != null) {
      updateData.currency_id = new Types.ObjectId(currency_id);
    }
    if (type_id != null) {
      updateData.type_id = new Types.ObjectId(type_id);
    }
    return this.walletRepository.update(walletId, updateData);
  }

  async deleteWallet(walletId: string) {
    return this.walletRepository.delete(walletId);
  }
}
