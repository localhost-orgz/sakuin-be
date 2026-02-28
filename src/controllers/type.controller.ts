import type { Request, Response } from 'express';
import { TypeService } from '../services/type.service.js';

type Params = {
  slug: string;
};

const typeService = new TypeService();

export const getAllTypes = async (_req: Request, res: Response) => {
  try {
    const types = await typeService.getAllTypes();
    return res.status(200).json({
      status: 'success',
      data: types,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const getTypeBySlug = async (req: Request<Params>, res: Response) => {
  try {
    const { slug } = req.params;
    const type = await typeService.getTypeBySlug(slug);
    if (!type) {
      return res.status(404).json({ status: 'error', message: 'Type not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: type,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const createType = async (req: Request, res: Response) => {
  try {
    const newType = await typeService.createType(req.body);
    return res.status(201).json({
      status: 'success',
      data: newType,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const updateType = async (req: Request<Params>, res: Response) => {
  try {
    const { slug } = req.params;
    const updatedType = await typeService.updateType(slug, req.body);
    if (!updatedType) {
      return res.status(404).json({ status: 'error', message: 'Type not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: updatedType,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const deleteType = async (req: Request<Params>, res: Response) => {
  try {
    const { slug } = req.params;
    const deleted = await typeService.deleteType(slug);
    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Type not found' });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Type deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};
