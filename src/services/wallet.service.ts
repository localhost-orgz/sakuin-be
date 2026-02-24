import { WalletRepository } from '../repositories/wallet.repository.js';
import { v4 as uuid } from 'uuid';
import type { createWalletDTO, updateWalletDTO } from '../dtos/wallet.dto.js';
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
      wallet_id: uuid(),
    };
    return this.walletRepository.create(walletData);
  }

  async updateWallet(walletId: string, data: updateWalletDTO) {
    return this.walletRepository.update(walletId, data);
  }

  async deleteWallet(walletId: string) {
    return this.walletRepository.delete(walletId);
  }
}
