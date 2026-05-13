import { UserRepository } from '../repositories/user.repository.js';
import { type User } from '../models/user.model.js';

const userRepository = new UserRepository();

export const updateUserService = async (userId: string, updateData: Partial<User>) => {
  return await userRepository.update(userId, updateData);
};
