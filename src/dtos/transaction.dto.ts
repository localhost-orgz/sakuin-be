import z from 'zod';

export const createTransactionSchema = z.object({
  category_id: z.string(),
  wallet_id: z.string(),
  amount: z.string(),
  type: z.enum(['income', 'expense', 'transfer']),
  name: z.string(),
  description: z.string().optional(),
  target_wallet_id: z.string().optional(),
  date: z.coerce.date(),
  input_method: z.enum(['manual', 'sakusnap', 'sakuvoice', 'sakushare']),
  attachment_url: z.url().optional(),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export type CreateTransactionDTO = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionDTO = z.infer<typeof updateTransactionSchema>;
