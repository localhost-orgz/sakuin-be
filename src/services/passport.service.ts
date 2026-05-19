import passport from 'passport';
import { UserRepository } from '../repositories/user.repository.js';
import { CategoryRepository } from '../repositories/category.repository.js';
import {
  Strategy as GoogleStrategy,
  type Profile,
  type VerifyCallback,
} from 'passport-google-oauth20';
import config from '../config/config.js';
import type { User } from '../models/user.model.js';
import { generateSlug } from '../utils/slug.js';

const userRepo = new UserRepository();
const categoryRepo = new CategoryRepository();

export const DEFAULT_CATEGORIES = [
  { name: 'Makanan & Minuman', emoticon: '🍔' },
  { name: 'Transportasi', emoticon: '🚗' },
  { name: 'Belanja', emoticon: '🛍️' },
  { name: 'Kesehatan', emoticon: '🏥' },
  { name: 'Gaji', emoticon: '💰' },
  { name: 'Lainnya', emoticon: '📦' },
];

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
          
          const userId = (user as any)._id.toString();

          for (const category of DEFAULT_CATEGORIES) {
            const generatedSlug = `${generateSlug(category.name)}-${userId.substring(18)}`; 

            await categoryRepo.create({
              user_id: userId,
              name: category.name,
              emoticon: category.emoticon,
              slug: generatedSlug,
            } as any);
          }
        }
        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    },
  ),
);