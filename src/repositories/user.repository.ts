import { UserModel, type User } from '../models/user.model.js';

export class UserRepository {
  async findByGoogleId(googleId: string) {
    return await UserModel.findOne({ google_id: googleId });
  }

  async findByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async findById(id: string) {
    return await UserModel.findById(id);
  }

  async create(data: User) {
    return await UserModel.create(data);
  }

  async update(id: string, data: Partial<User>) {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }
}
