import { GoogleGenerativeAI } from '@google/generative-ai';
import { CategoryService } from './category.service.js';

export class AIService {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  private getModel(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    // return genAI.getGenerativeModel({ model: 'gemma-3-27b-it' });
  }

  async sakusnap(imageBuffer: Buffer, userId: string) {
    const model = this.getModel(process.env.SAKUSNAP_GEMINI_KEY!);
    const categories = await this.categoryService.getAllCategoriesByUserId(userId);
  
    const prompt = `
      Anda adalah asisten keuangan pribadi. Ekstrak data detail dari gambar struk belanja berikut.
      
      Daftar kategori yang tersedia: ${JSON.stringify(categories)}.

      INSTRUKSI PENTING:
      1. Ekstrak setiap barang yang dibeli ke dalam array 'items'.
      2. Untuk setiap barang, tentukan nama barang, kuantitas, harga satuan, dan harga totalnya dalam angka penuh (contoh: 5rb menjadi 5000).
      3. Hitung total nominal akhir (amount) dari seluruh struk.
      4. Pilih SATU category_id dan category_name yang paling mewakili jenis belanjaan ini secara umum.
      5. KEMBALIKAN DALAM FORMAT JSON BERIKUT.

      Format Output JSON:
      {
        "category_id": "string",
        "category_name": "string",
        "amount": number,
        "type": "expense",
        "description": "string (ringkasan singkat belanjaan)",
        "date": "YYYY-MM-DD",
        "items": [
          {
            "name": "string (nama barang)",
            "quantity": "number (kuantitas barang)",
            "price": number (harga satuan barang)
            "total": number (harga total barang)
          }
        ]
      }

      Jika tanggal tidak ditemukan, gunakan ${new Date().toISOString().split('T')[0]}.
      Jawab hanya dengan JSON tanpa tambahan teks apapun.
    `;
  
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: imageBuffer.toString("base64"), mimeType: "image/png" } }
    ]);
  
    const cleanedText = result.response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedText);
  }

  async sakuvoice(voice: string, userId: string) {
    const model = this.getModel(process.env.SAKUVOICE_GEMINI_KEY!);
    const categories = await this.categoryService.getAllCategoriesByUserId(userId);

    const prompt = `
      Anda adalah asisten keuangan pribadi. Ekstrak data dari teks transkripsi suara berikut.
      Teks: "${voice}"

      Daftar kategori yang tersedia: ${JSON.stringify(categories)}.

      INSTRUKSI PENTING:
      1. Hitung total amount (jumlah uang) dari SEMUA item yang disebutkan.
      2. Jika dalam teks disebutkan nominal dalam "ribu", pastikan untuk mengubahnya menjadi angka penuh (contoh: 25 ribu menjadi 25000).
      3. Gabungkan semua deskripsi menjadi satu kalimat deskripsi yang lengkap dan jelas.
      4. Pilih SATU category_id dan category_name yang paling mewakili total pengeluaran tersebut.
      5. KEMBALIKAN DALAM SATU OBJEK JSON SAJA (jangan gunakan array).

      Format Output JSON:
      {
        "category_id": "string",
        "category_name": "string",
        "amount": number,
        "type": "expense",
        "description": "string",
        "date": "YYYY-MM-DD"
      }

      Jika tanggal tidak disebutkan, gunakan ${new Date().toISOString().split('T')[0]}, 
      jika disebut {sekian} hari lalu, gunakan dari ${new Date().toISOString().split('T')[0]} dikurangi {sekian} teresebut.

      Jawab hanya dengan JSON tanpa tambahan teks apapun.
    `;

    const result = await model.generateContent(prompt);
    return JSON.parse(
      result.response
        .text()
        .replace(/```json|```/g, '')
        .trim(),
    );
  }

  async sakushare(imageBuffer: Buffer, userId: string) {
    const model = this.getModel(process.env.SAKUSHARE_GEMINI_KEY!);
    const categories = await this.categoryService.getAllCategoriesByUserId(userId);

    const prompt = `
      Anda adalah asisten keuangan pribadi. Ekstrak data dari gambar bukti transfer berikut.

      Daftar kategori yang tersedia: ${JSON.stringify(categories)}.

      INSTRUKSI PENTING:
      1. Identifikasi nominal transaksi. Jika tertulis "ribu" atau format angka singkat, ubah menjadi angka penuh (contoh: 25rb menjadi 25000).
      2. Tentukan deskripsi transaksi yang jelas dari gambar.
      3. Pilih SATU category_id dan category_name yang paling relevan dari daftar di atas.
      4. KEMBALIKAN DALAM SATU OBJEK JSON SAJA (jangan gunakan array).

      Format Output JSON:
      {
        "category_id": "string",
        "category_name": "string",
        "amount": number,
        "type": "expense",
        "description": "string",
        "date": "YYYY-MM-DD"
      }

      Jika tanggal tidak ditemukan di gambar, gunakan ${new Date().toISOString().split('T')[0]}.
      Jawab hanya dengan JSON tanpa tambahan teks apapun.
    `;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: imageBuffer.toString('base64'), mimeType: 'image/png' } },
    ]);

    return JSON.parse(
      result.response
        .text()
        .replace(/```json|```/g, '')
        .trim(),
    );
  }
}
