import { CurrencyRepository } from '../repositories/currency.repository.js';
import type { createCurrencyDTO, updateCurrencyDTO } from '../dtos/currency.dto.js';

export class CurrencyService {
  private currencyRepo: CurrencyRepository;

  constructor() {
    this.currencyRepo = new CurrencyRepository();
  }

  async getAllCurrencies() {
    return await this.currencyRepo.findAll();
  }

  async getCurrencyByCode(code: string) {
    return await this.currencyRepo.findByCode(code);
  }

  async getCurrencyById(id: string) {
    return await this.currencyRepo.findById(id);
  }

  async createCurrency(data: createCurrencyDTO) {
    return await this.currencyRepo.create(data);
  }

  async updateCurrency(code: string, data: updateCurrencyDTO) {
    return await this.currencyRepo.update(code, data);
  }

  async deleteCurrency(code: string) {
    return await this.currencyRepo.delete(code);
  }
}
