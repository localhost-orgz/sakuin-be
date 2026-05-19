import type { Request, Response } from 'express';
import type { UserDocument } from '../models/user.model.js';
import { UserService } from '../services/user.service.js';

export class UserController {
  private userService = new UserService();

  getProfile = async (req: Request, res: Response) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'User tidak terautentikasi',
        });
      }

      const profileData = await this.userService.getProfileWithFinancials(user);

      res.status(200).json({
        status: 'success',
        data: profileData,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Gagal mengambil data profil',
      });
    }
  };

  updateProfile = async (req: Request, res: Response) => {
    try {
      const user = req.user as UserDocument;
      const { name, avatar_url } = req.body;

      const updatedUser = await this.userService.updateUserService(user._id.toString(), {
        name,
        avatar_url,
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
}
