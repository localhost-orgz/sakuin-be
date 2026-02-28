import { CurrencyModel, type Currency } from '../models/currency.model.js';

export class CurrencyRepository {
  async findAll() {
    return await CurrencyModel.find();
  }

  async findByCode(code: string) {
    return await CurrencyModel.findOne({ code: code.toUpperCase() });
  }

  async findById(id: string) {
    return await CurrencyModel.findById(id);
  }

  async create(data: Currency) {
    return await CurrencyModel.create({
      ...data,
      code: data.code.toUpperCase(),
    });
  }

  async update(code: string, data: Partial<Currency>) {
    const update = { ...data };
    if (data.code) update.code = data.code.toUpperCase();
    return await CurrencyModel.findOneAndUpdate({ code: code.toUpperCase() }, update, {
      returnDocument: 'after',
    });
  }

  async delete(code: string) {
    return await CurrencyModel.findOneAndDelete({ code: code.toUpperCase() });
  }
}
