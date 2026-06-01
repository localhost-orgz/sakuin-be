import type { Request, Response } from 'express';
import { GoalHistoryService } from '../services/goal-history.service.js';

type Params = {
  uuid: string; // Bisa digunakan untuk goalId atau historyId di endpoint URL
};

const historyService = new GoalHistoryService();

// Mengambil semua riwayat goals milik user yang sedang login
export const getAllHistoryByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const histories = await historyService.getHistoryByUserId(userId);
    return res.status(200).json({
      status: 'success',
      data: histories,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

// Mengambil riwayat spesifik untuk satu Goal tertentu
export const getHistoryByGoal = async (req: Request<Params>, res: Response) => {
  try {
    const { uuid: goalId } = req.params;
    const histories = await historyService.getHistoryByGoalId(goalId);
    return res.status(200).json({
      status: 'success',
      data: histories,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

// Menambahkan riwayat alokasi tabungan goal baru
export const createGoalHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const newHistory = await historyService.createHistory(req.body, userId);
    return res.status(201).json({
      status: 'success',
      data: newHistory,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

// Menghapus riwayat transaksi goal
export const deleteGoalHistory = async (req: Request<Params>, res: Response) => {
  try {
    const { uuid: historyId } = req.params;
    const deleted = await historyService.deleteHistory(historyId);
    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'History record not found' });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Goal history deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};
