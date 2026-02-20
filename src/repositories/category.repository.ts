import { CategoryModel, type Category } from '../models/category.model.js';

export class CategoryRepository {
  async findAllByUserId(userId: string) {
    return await CategoryModel.find({
      $or: [{ user_id: null }, { user_id: userId }],
    });
  }

  async findBySlug(slug: string) {
    return await CategoryModel.findOne({ slug });
  }

  async create(data: Category) {
    return await CategoryModel.create(data);
  }

  async update(slug: string, data: Partial<Category>) {
    return await CategoryModel.findOneAndUpdate({ slug }, data, { returnDocument: 'after' });
  }

  async delete(slug: string) {
    return await CategoryModel.findOneAndDelete({ slug });
  }
}
