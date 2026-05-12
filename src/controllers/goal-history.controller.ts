import type { Request, Response } from 'express';
import { GoalHistoryService } from '../services/goal-history.service.js';

type GoalIdParams = {
  goalId: string;
};

type IdParams = {
  id: string;
};

const goalHistoryService = new GoalHistoryService();

export const getHistoriesByGoalId = async (req: Request<GoalIdParams>, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const { goalId } = req.params;
    const histories = await goalHistoryService.getHistoriesByGoalId(goalId, userId);
    if (histories === null) {
      return res.status(404).json({ status: 'error', message: 'Goal not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: histories,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const getHistoryById = async (req: Request<IdParams>, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const { id } = req.params;
    const history = await goalHistoryService.getHistoryById(id, userId);
    if (!history) {
      return res.status(404).json({ status: 'error', message: 'Goal history not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: history,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const createGoalHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const created = await goalHistoryService.createHistory(req.body, userId);
    if (!created) {
      return res.status(404).json({ status: 'error', message: 'Goal not found' });
    }
    return res.status(201).json({
      status: 'success',
      data: created,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const updateGoalHistory = async (req: Request<IdParams>, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const { id } = req.params;
    const updated = await goalHistoryService.updateHistory(id, userId, req.body);
    if (!updated) {
      return res.status(404).json({ status: 'error', message: 'Goal history not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const deleteGoalHistory = async (req: Request<IdParams>, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const { id } = req.params;
    const deleted = await goalHistoryService.deleteHistory(id, userId);
    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Goal history not found' });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Goal history deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};
