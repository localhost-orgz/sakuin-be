import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CategoryModel, type Category } from '../models/category.model.js';

dotenv.config();

const categories: Partial<Category>[] = [
  {
    name: 'Makanan & Minuman',
    slug: 'makanan-minuman',
    emoticon: '🍔',
  },
  {
    name: 'Transportasi',
    slug: 'transportasi',
    emoticon: '🚌',
  },
  { name: 'Belanja', slug: 'belanja', emoticon: '🛍️' },
  {
    name: 'Hiburan',
    slug: 'hiburan',
    emoticon: '🎉',
  },
  {
    name: 'Kesehatan',
    slug: 'kesehatan',
    emoticon: '💊',
  },
  { name: 'Gaji', slug: 'gaji', emoticon: '💰' },
  {
    name: 'Lainnya',
    slug: 'lainnya',
    emoticon: '📦',
  },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Menghubungkan ke database untuk seeding...');

    await CategoryModel.deleteMany({ user_id: null });

    await CategoryModel.insertMany(categories);

    console.log('Seeding Category Berhasil!');
    process.exit();
  } catch (error) {
    console.error('Seeding Gagal:', error);
    process.exit(1);
  }
};

seedCategories();
