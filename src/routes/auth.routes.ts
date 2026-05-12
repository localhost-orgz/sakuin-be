import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import type { UserDocument } from '../models/user.model.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getProfile } from '../controllers/user.controller.js';

const router = Router();

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
//   const user = req.user as UserDocument;
//   const token = jwt.sign({ userId: user._id }, config.jwt.secret_key, { expiresIn: '7d' });
//   res.redirect(`${config.app.frontend_url}?token=${token}`);
// });

router.get('/google', (req, res, next) => {
  const { redirect_uri } = req.query;

  const state = redirect_uri 
    ? Buffer.from(JSON.stringify({ redirect_uri })).toString('base64') 
    : undefined;

  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    state: state 
  })(req, res, next);
});

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  if (!req.user) {
    return res.redirect(`${config.app.frontend_url}?error=auth_failed`);
  }

  const user = req.user as UserDocument;
  const token = jwt.sign({ userId: user._id }, config.jwt.secret_key, { expiresIn: '7d' });

  let finalRedirectUrl = config.app.frontend_url;

  const stateQuery = req.query.state;

  if (stateQuery && typeof stateQuery === 'string') {
    try {
      const stateData = JSON.parse(Buffer.from(stateQuery, 'base64').toString());
      if (stateData.redirect_uri && typeof stateData.redirect_uri === 'string') {
        finalRedirectUrl = stateData.redirect_uri;
      }
    } catch (e) {
      console.error("Gagal parse state:", e);
    }
  }

  const separator = finalRedirectUrl.includes('?') ? '&' : '?';
  res.redirect(`${finalRedirectUrl}${separator}token=${token}`);
});

router.get('/profile', authMiddleware, getProfile);

export default router;
