import type { Request, Response } from 'express';
import { GoalHistoryService } from '../services/goal-history.service.js';

type Params = {
  uuid: string; // Digunakan sebagai goalId, historyId atau params endpoint URL lainnya
};

const historyService = new GoalHistoryService();

// [READ ALL] Mengambil semua riwayat goals milik user yang sedang login
export const getAllHistoryByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const histories = await historyService.getHistoryByUserId(userId);
    return res.status(200).json({ status: 'success', data: histories });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

// [READ DETAIL] Mengambil satu log riwayat secara spesifik berdasarkan ID riwayat
export const getHistoryById = async (req: Request<Params>, res: Response) => {
  try {
    const { uuid: historyId } = req.params;
    const history = await historyService.getHistoryById(historyId);
    if (!history) {
      return res.status(404).json({ status: 'error', message: 'History record not found' });
    }
    return res.status(200).json({ status: 'success', data: history });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

// [READ BY GOAL] Mengambil riwayat spesifik untuk satu Goal tertentu
export const getHistoryByGoal = async (req: Request<Params>, res: Response) => {
  try {
    const { uuid: goalId } = req.params;
    const histories = await historyService.getHistoryByGoalId(goalId);
    return res.status(200).json({ status: 'success', data: histories });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

// [CREATE] Menambahkan riwayat alokasi tabungan goal baru
export const createGoalHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const newHistory = await historyService.createHistory(req.body, userId);
    return res.status(201).json({ status: 'success', data: newHistory });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

// [UPDATE] Memperbarui riwayat transaksi goal
export const updateGoalHistory = async (req: Request<Params>, res: Response) => {
  try {
    const { uuid: historyId } = req.params;
    const updatedHistory = await historyService.updateHistory(historyId, req.body);
    if (!updatedHistory) {
      return res.status(404).json({ status: 'error', message: 'History record not found' });
    }
    return res.status(200).json({ status: 'success', data: updatedHistory });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

// [DELETE] Menghapus riwayat transaksi goal
export const deleteGoalHistory = async (req: Request<Params>, res: Response) => {
  try {
    const { uuid: historyId } = req.params;
    const deleted = await historyService.deleteHistory(historyId);
    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'History record not found' });
    }
    return res.status(200).json({ status: 'success', message: 'Goal history deleted successfully' });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};