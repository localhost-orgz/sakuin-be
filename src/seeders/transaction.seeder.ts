import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { TransactionModel } from '../models/transaction.model.js';

dotenv.config();

const runMigration = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log('Menghubungkan ke database...');
      await mongoose.connect(process.env.MONGO_URI!);
    }

    const deleteResult = await TransactionModel.deleteMany({});
    console.log(`Berhasil menghapus ${deleteResult.deletedCount} transaksi.`);

    console.log(`\n=========================================`);
    console.log(`Migrasi Berhasil!`);
    console.log(`=========================================`);

  } catch (error) {
    console.error('Terjadi kesalahan saat menjalankan migrasi:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Koneksi database ditutup.');
  }
};

runMigration();