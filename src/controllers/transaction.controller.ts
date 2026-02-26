import type { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service.js';
import type { CreateTransactionDTO, UpdateTransactionDTO } from '../dtos/transaction.dto.js';

type TransactionParams = {
  id: string;
};

const transactionService = new TransactionService();

export const getAllTransactionsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const transactions = await transactionService.getAllTransactionsByUserId(userId);
    return res.status(200).json({
      status: 'success',
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const getTransactionById = async (req: Request<TransactionParams>, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.getTransactionById(id);
    if (!transaction) {
      return res.status(404).json({ status: 'error', message: 'Transaction not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const data: CreateTransactionDTO = req.body;
    const newTransaction = await transactionService.createTransaction(userId, data);
    return res.status(201).json({
      status: 'success',
      data: newTransaction,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const updateTransaction = async (req: Request<TransactionParams>, res: Response) => {
  try {
    const { id } = req.params;
    const data: UpdateTransactionDTO = req.body;
    const updatedTransaction = await transactionService.updateTransaction(id, data);
    if (!updatedTransaction) {
      return res.status(404).json({ status: 'error', message: 'Transaction not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: updatedTransaction,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const deleteTransaction = async (req: Request<TransactionParams>, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await transactionService.deleteTransaction(id);
    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Transaction not found' });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};
