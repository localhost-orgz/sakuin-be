/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { UserDocument } from '../models/user.model.ts';

declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}
