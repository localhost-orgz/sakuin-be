import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CategoryModel, type Category } from '../models/category.model.js';

dotenv.config();

const categories: Partial<Category>[] = [
  {
    name: 'Makanan & Minuman',
    slug: 'makanan-minuman',
    icon_url: 'https://res.cloudinary.com/id/icon/food.png',
  },
  {
    name: 'Transportasi',
    slug: 'transportasi',
    icon_url: 'https://res.cloudinary.com/id/icon/transport.png',
  },
  { name: 'Belanja', slug: 'belanja', icon_url: 'https://res.cloudinary.com/id/icon/shopping.png' },
  {
    name: 'Hiburan',
    slug: 'hiburan',
    icon_url: 'https://res.cloudinary.com/id/icon/entertainment.png',
  },
  {
    name: 'Kesehatan',
    slug: 'kesehatan',
    icon_url: 'https://res.cloudinary.com/id/icon/health.png',
  },
  { name: 'Gaji', slug: 'gaji', icon_url: 'https://res.cloudinary.com/id/icon/salary.png' },
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
