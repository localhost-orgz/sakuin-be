import type { Request, Response } from 'express';
import { AIService } from '../services/ai.service.js';

const aiService = new AIService();

export const sakushare = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'File wajib diunggah.' });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    const data = await aiService.sakushare(req.file.buffer, userId);

    return res.status(200).json({
      status: 'success',
      message: 'Data berhasil diekstrak',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Gagal memproses Sakushare',
      error: (error as Error).message,
    });
  }
};
