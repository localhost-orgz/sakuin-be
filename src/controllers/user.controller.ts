import type { Request, Response } from 'express';
import type { UserDocument } from '../models/user.model.js';
import { updateUserService } from '../services/user.service.js';

export const getProfile = (req: Request, res: Response) => {
  const user = req.user;

  res.status(200).json({
    status: 'success',
    data: user,
  });
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserDocument;
    const { name, avatar_url } = req.body;

    const updatedUser = await updateUserService(user._id.toString(), {
      name,
      avatar_url
    });

    res.status(200).json({
      status: 'success',
      message: 'Profil berhasil diperbarui',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Gagal memperbarui profil',
    });
  }
};