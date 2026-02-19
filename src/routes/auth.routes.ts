import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import type { UserDocument } from '../models/user.model.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getProfile } from '../controllers/user.controller.js';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const user = req.user as UserDocument;
  const token = jwt.sign({ userId: user._id }, config.jwt.secret_key, { expiresIn: '7d' });
  res.redirect(`${config.app.frontend_url}?token=${token}`);
});

router.get('/profile', authMiddleware, getProfile);

export default router;
