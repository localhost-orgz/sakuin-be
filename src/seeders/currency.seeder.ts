import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CurrencyModel, type Currency } from '../models/currency.model.js';

dotenv.config();

const currencies: Currency[] = [
  // --- ASIA & ASEAN ---
  { name: 'Indonesian Rupiah', symbol: 'Rp', code: 'IDR', flag: '🇮🇩' },
  { name: 'Singapore Dollar', symbol: 'S$', code: 'SGD', flag: '🇸🇬' },
  { name: 'Malaysian Ringgit', symbol: 'RM', code: 'MYR', flag: '🇲🇾' },
  { name: 'Thai Baht', symbol: '฿', code: 'THB', flag: '🇹🇭' },
  { name: 'Vietnamese Dong', symbol: '₫', code: 'VND', flag: '🇻🇳' },
  { name: 'Philippine Peso', symbol: '₱', code: 'PHP', flag: '🇵🇭' },
  { name: 'Japanese Yen', symbol: '¥', code: 'JPY', flag: '🇯🇵' },
  { name: 'South Korean Won', symbol: '₩', code: 'KRW', flag: '🇰🇷' },
  { name: 'Chinese Yuan', symbol: '¥', code: 'CNY', flag: '🇨🇳' },
  { name: 'Hong Kong Dollar', symbol: 'HK$', code: 'HKD', flag: '🇭🇰' },
  { name: 'Indian Rupee', symbol: '₹', code: 'INR', flag: '🇮🇳' },

  // --- AMERIKA ---
  { name: 'US Dollar', symbol: '$', code: 'USD', flag: '🇺🇸' },
  { name: 'Canadian Dollar', symbol: 'C$', code: 'CAD', flag: '🇨🇦' },
  { name: 'Brazilian Real', symbol: 'R$', code: 'BRL', flag: '🇧🇷' },
  { name: 'Mexican Peso', symbol: '$', code: 'MXN', flag: '🇲🇽' },

  // --- EROPA ---
  { name: 'Euro', symbol: '€', code: 'EUR', flag: '🇪🇺' },
  { name: 'British Pound', symbol: '£', code: 'GBP', flag: '🇬🇧' },
  { name: 'Swiss Franc', symbol: 'CHF', code: 'CHF', flag: '🇨🇭' },
  { name: 'Russian Ruble', symbol: '₽', code: 'RUB', flag: '🇷🇺' },
  { name: 'Turkish Lira', symbol: '₺', code: 'TRY', flag: '🇹🇷' },

  // --- OCEANIA & MIDDLE EAST ---
  { name: 'Australian Dollar', symbol: 'A$', code: 'AUD', flag: '🇦🇺' },
  { name: 'New Zealand Dollar', symbol: 'NZ$', code: 'NZD', flag: '🇳🇿' },
  { name: 'Saudi Riyal', symbol: 'SR', code: 'SAR', flag: '🇸🇦' },
  { name: 'UAE Dirham', symbol: 'AED', code: 'AED', flag: '🇦🇪' },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Menghubungkan ke database untuk seeding...');

    await CurrencyModel.deleteMany({ user_id: null });

    await CurrencyModel.insertMany(currencies);

    console.log('Seeding Category Berhasil!');
    process.exit();
  } catch (error) {
    console.error('Seeding Gagal:', error);
    process.exit(1);
  }
};

seedCategories();
