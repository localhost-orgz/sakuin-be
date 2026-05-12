import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CurrencyModel, type Currency } from '../models/currency.model.js';

dotenv.config();

const currencies: Partial<Currency>[] = [
  { code: 'IDR', country: 'Indonesia' },
  { code: 'USD', country: 'Amerika Serikat' },
  { code: 'EUR', country: 'Eropa' },
  { code: 'JPY', country: 'Jepang' },
  { code: 'SGD', country: 'Singapura' },
];

const seedCurrencies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Menghubungkan ke database untuk seeding...');

    await CurrencyModel.deleteMany({ user_id: null });

    // Masukkan seed
    await CurrencyModel.insertMany(currencies);

    console.log('Seeding Currency Berhasil!');
    process.exit();
  } catch (error) {
    console.error('Seeding Gagal:', error);
    process.exit(1);
  }
};

seedCurrencies();
