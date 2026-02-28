import { TypeModel, type WalletType } from '../models/type.model.js';

export class TypeRepository {
  async findAll() {
    return await TypeModel.find();
  }

  async findBySlug(slug: string) {
    return await TypeModel.findOne({ slug });
  }

  async create(data: WalletType) {
    return await TypeModel.create(data);
  }

  async update(slug: string, data: Partial<WalletType>) {
    return await TypeModel.findOneAndUpdate({ slug }, data, { returnDocument: 'after' });
  }

  async delete(slug: string) {
    return await TypeModel.findOneAndDelete({ slug });
  }
}
