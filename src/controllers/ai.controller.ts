import type { Request, Response } from 'express';
import { AIService } from '../services/ai.service.js';

const aiService = new AIService();

export const sakusnap = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'File wajib diunggah.' });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    const data = await aiService.sakusnap(req.file.buffer, userId);

    return res.status(200).json({
      status: 'success',
      message: 'Data struk berhasil diekstrak',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Gagal memproses SakuSnap',
      error: (error as Error).message,
    });
  }
}

export const sakuvoice = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'File audio MP3 wajib diunggah.' });
    }

    if (!req.file.mimetype.startsWith('audio/')) {
      return res.status(400).json({ status: 'error', message: 'File yang diunggah harus berupa audio (MP3/WAV/dll).' });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    const textResponse = await aiService.processAudioToText(req.file.buffer);

    const data = await aiService.sakuvoice(textResponse, userId);

    return res.status(200).json({
      status: 'success',
      message: 'Data berhasil diekstrak dari suara',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Gagal memproses SakuVoice',
      error: (error as Error).message,
    });
  }
};

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
      message: 'Bukti Transfer berhasil diekstrak',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Gagal memproses SakuShare',
      error: (error as Error).message,
    });
  }
};
