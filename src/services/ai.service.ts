import { GoogleGenerativeAI } from '@google/generative-ai';
import { CategoryService } from './category.service.js';

export class AIService {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  private getModel(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: 'gemma-3-4b-it' });
  }

  async sakushare(imageBuffer: Buffer, userId: string) {
    const model = this.getModel(process.env.SAKUSHARE_GEMINI_KEY!);
    const categories = await this.categoryService.getAllCategoriesByUserId(userId);

    const prompt = `
        Kamu adalah asisten keuangan pribadi. Ekstrak data dari bukti transfer ke JSON:
        Daftar kategori: ${JSON.stringify(categories)}.
        
        Format Output JSON saja:
        {
        "category_id": "string",
        "category_name": "string",
        "amount": number,
        "type": "income/expense",
        "description": "string",
        "date": "YYYY-MM-DD"
        }
        Jika tanggal tidak ada, gunakan ${new Date().toISOString().split('T')[0]}.
        Jika tujuan transfer nya belum 
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
