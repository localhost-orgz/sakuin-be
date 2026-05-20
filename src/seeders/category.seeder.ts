import mongoose from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { CategoryModel } from '../models/category.model.js';
import { generateSlug } from '../utils/slug.js';
import dotenv from 'dotenv';

dotenv.config();

export const DEFAULT_CATEGORIES = [
  { name: 'Makanan & Minuman', emoticon: '🍔', color: '#FF5733' },
  { name: 'Transportasi', emoticon: '🚗', color: '#33A2FF' },
  { name: 'Belanja', emoticon: '🛍️', color: '#E133FF' },
  { name: 'Kesehatan', emoticon: '🏥', color: '#33FF57' },
  { name: 'Gaji', emoticon: '💰', color: '#2ECC71' },
  { name: 'Lainnya', emoticon: '📦', color: '#95A5A6' },
];

const runMigration = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log('Menghubungkan ke database...');
      await mongoose.connect(process.env.MONGO_URI!);
    }

    console.log('Menghapus semua kategori lama...');
    const deleteResult = await CategoryModel.deleteMany({});
    console.log(`Berhasil menghapus ${deleteResult.deletedCount} kategori lama.`);

    console.log('Mengambil data semua user...');
    const users = await UserModel.find({});
    console.log(`Ditemukan ${users.length} user.`);

    if (users.length === 0) {
      console.log('Tidak ada user yang ditemukan. Migrasi selesai.');
      return;
    }

    let totalCreated = 0;
    for (const user of users) {
      const userIdStr = user._id.toString();
      console.log(`Mengenerate kategori untuk user: ${user.name} (${userIdStr})`);

      for (const defaultCat of DEFAULT_CATEGORIES) {
        const slugBase = generateSlug(defaultCat.name);
        const uniqueSlug = `${slugBase}-${userIdStr.substring(18)}`;

        await CategoryModel.create({
          name: defaultCat.name,
          slug: uniqueSlug,
          emoticon: defaultCat.emoticon,
          color: defaultCat.color,
          user_id: user._id,
        });
        totalCreated++;
      }
    }

    console.log(`\n=========================================`);
    console.log(`Migrasi Berhasil!`);
    console.log(`Total ${totalCreated} kategori baru telah dibuat untuk ${users.length} user.`);
    console.log(`=========================================`);

  } catch (error) {
    console.error('Terjadi kesalahan saat menjalankan migrasi:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Koneksi database ditutup.');
  }
};

runMigration();