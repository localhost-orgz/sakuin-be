import type { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repositories/user.repository.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const userRepo = new UserRepository();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    const decoded = jwt.verify(token, config.jwt.secret_key) as { userId: string };

    const user = await userRepo.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user as Express.User;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
