import type { Request, Response } from 'express';
import { CategoryService } from '../services/category.service.js';

type Params = {
  slug: string;
};

const categoryService = new CategoryService();

export const getAllCategoriesByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id.toString();
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const categories = await categoryService.getAllCategoriesByUserId(userId);
    return res.status(200).json({
      status: 'success',
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const getCategoryBySlug = async (req: Request<Params>, res: Response) => {
  try {
    const { slug } = req.params;
    const category = await categoryService.getCategoryBySlug(slug);
    if (!category) {
      return res.status(404).json({ status: 'error', message: 'Category not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: category,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const data = { ...req.body, user_id: userId };
    const newCategory = await categoryService.createCategory(data);
    return res.status(201).json({
      status: 'success',
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const updateCategory = async (req: Request<Params>, res: Response) => {
  try {
    const { slug } = req.params;
    const updates = req.body;
    const updatedCategory = await categoryService.updateCategory(slug, updates);
    if (!updatedCategory) {
      return res.status(404).json({ status: 'error', message: 'Category not found' });
    }
    return res.status(200).json({
      status: 'success',
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const deleteCategory = async (req: Request<Params>, res: Response) => {
  try {
    const { slug } = req.params;
    const deleted = await categoryService.deleteCategory(slug);
    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Category not found' });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Category deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};
