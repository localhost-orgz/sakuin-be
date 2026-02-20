import { CategoryRepository } from '../repositories/category.repository.js';
import type { createCategoryDTO, updateCategoryDTO } from '../dtos/category.dto.js';
import { generateSlug } from '../utils/slug.js';

type UpdateCategoryWithSlug = updateCategoryDTO & {
  slug?: string;
};

export class CategoryService {
  private categoryRepo: CategoryRepository;

  constructor() {
    this.categoryRepo = new CategoryRepository();
  }

  async getAllCategoriesByUserId(userId: string) {
    return await this.categoryRepo.findAllByUserId(userId);
  }

  async getCategoryBySlug(slug: string) {
    return await this.categoryRepo.findBySlug(slug);
  }

  async createCategory(data: createCategoryDTO) {
    const slug = generateSlug(data.name);
    return await this.categoryRepo.create({ ...data, slug });
  }

  async updateCategory(slug: string, data: updateCategoryDTO) {
    const updatedData: UpdateCategoryWithSlug = { ...data };
    if (data.name) {
      updatedData.slug = generateSlug(data.name);
    }
    return await this.categoryRepo.update(slug, updatedData);
  }

  async deleteCategory(slug: string) {
    return await this.categoryRepo.delete(slug);
  }
}
