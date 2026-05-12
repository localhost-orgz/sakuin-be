import type { Request, Response } from 'express';
import { GoalService } from '../services/goal.service.js';

type Params = {
  id: string;
};

const goalService = new GoalService();

export const getAllGoalsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const goals = await goalService.getAllGoalsByUserId(userId);
    return res.status(200).json({
      status: 'success',
      data: goals,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const getGoalById = async (req: Request<Params>, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const { id } = req.params;
    const goal = await goalService.getGoalById(id, userId);
    if (!goal) {
      return res.status(404).json({ status: 'error', message: 'Goal not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: goal,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const createGoal = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const newGoal = await goalService.createGoal(req.body, userId);
    return res.status(201).json({
      status: 'success',
      data: newGoal,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const updateGoal = async (req: Request<Params>, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const { id } = req.params;
    const updatedGoal = await goalService.updateGoal(id, userId, req.body);
    if (!updatedGoal) {
      return res.status(404).json({ status: 'error', message: 'Goal not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: updatedGoal,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const deleteGoal = async (req: Request<Params>, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const { id } = req.params;
    const deleted = await goalService.deleteGoal(id, userId);
    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Goal not found' });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Goal deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};
