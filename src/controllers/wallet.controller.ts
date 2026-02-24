import type { Request, Response } from 'express';
import { WalletService } from '../services/wallet.service.js';

type Params = {
  uuid: string;
};

const walletService = new WalletService();

export const getAllWalletsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const wallets = await walletService.getAllWalletsByUserId(userId);
    return res.status(200).json({
      status: 'success',
      data: wallets,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const getWalletByWalletId = async (req: Request<Params>, res: Response) => {
  try {
    const { uuid } = req.params;
    const wallet = await walletService.getWalletByWalletId(uuid);
    if (!wallet) {
      return res.status(404).json({ status: 'error', message: 'Wallet not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: wallet,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const createWallet = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const newWallet = await walletService.createWallet(req.body, userId);
    return res.status(201).json({
      status: 'success',
      data: newWallet,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const updateWallet = async (req: Request<Params>, res: Response) => {
  try {
    const { uuid } = req.params;
    const updatedWallet = await walletService.updateWallet(uuid, req.body);
    if (!updatedWallet) {
      return res.status(404).json({ status: 'error', message: 'Wallet not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: updatedWallet,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const deleteWallet = async (req: Request<Params>, res: Response) => {
  try {
    const { uuid } = req.params;
    const deleted = await walletService.deleteWallet(uuid);
    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Wallet not found' });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Wallet deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};
