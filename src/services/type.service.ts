import { TypeRepository } from '../repositories/type.repository.js';
import type { createTypeDTO, updateTypeDTO } from '../dtos/type.dto.js';
import { generateSlug } from '../utils/slug.js';

type UpdateTypeWithSlug = updateTypeDTO & {
  slug?: string;
};

export class TypeService {
  private typeRepo: TypeRepository;

  constructor() {
    this.typeRepo = new TypeRepository();
  }

  async getAllTypes() {
    return await this.typeRepo.findAll();
  }

  async getTypeBySlug(slug: string) {
    return await this.typeRepo.findBySlug(slug);
  }

  async createType(data: createTypeDTO) {
    const slug = generateSlug(data.name);
    return await this.typeRepo.create({ ...data, slug });
  }

  async updateType(slug: string, data: updateTypeDTO) {
    const updatedData: UpdateTypeWithSlug = { ...data };
    if (data.name) {
      updatedData.slug = generateSlug(data.name);
    }
    return await this.typeRepo.update(slug, updatedData);
  }

  async deleteType(slug: string) {
    return await this.typeRepo.delete(slug);
  }
}
