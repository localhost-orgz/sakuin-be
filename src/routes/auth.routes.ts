import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import type { UserDocument } from '../models/user.model.js';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const user = req.user as UserDocument;
  const token = jwt.sign({ userId: user._id }, config.jwt.secret_key, { expiresIn: '7s' });
  res.redirect(`${config.app.frontend_url}?token=${token}`);
});

export default router;
