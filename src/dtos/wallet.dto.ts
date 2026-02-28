import z from 'zod';

export const createWalletSchema = z.object({
  name: z.string(),
  color: z.string(),
  balance: z.number().default(0),
  currency_id: z.string(),
  type_id: z.string(),
});

export const updateWalletSchema = createWalletSchema.partial();

export type createWalletDTO = z.infer<typeof createWalletSchema>;
export type updateWalletDTO = z.infer<typeof updateWalletSchema>;
