import passport from 'passport';
import { UserRepository } from '../repositories/user.repository.js';
import {
  Strategy as GoogleStrategy,
  type Profile,
  type VerifyCallback,
} from 'passport-google-oauth20';
import config from '../config/config.js';
import type { User } from '../models/user.model.js';

const userRepo = new UserRepository();

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.client_id,
      clientSecret: config.google.client_secret,
      callbackURL: config.google.callback_url,
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error('No email found from Google profile'));

        let user = await userRepo.findByGoogleId(profile.id);

        if (!user) {
          const newUser: User = {
            google_id: profile.id,
            name: profile.displayName,
            email: email,
            created_at: new Date(),
            avatar_url: profile.photos?.[0]?.value ?? null,
          };
          user = await userRepo.create(newUser);
        }
        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    },
  ),
);
