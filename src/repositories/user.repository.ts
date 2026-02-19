import { UserModel, type User } from '../models/user.model.js';

export class UserRepository {
  async findByGoogleId(googleId: string) {
    return await UserModel.findOne({ google_id: googleId });
  }

  async findByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async create(data: User) {
    return await UserModel.create(data);
  }
}
