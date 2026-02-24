import z from 'zod';

export const createWalletSchema = z.object({
  name: z.string(),
  color: z.string(),
  balance: z.number().default(0),
});

export const updateWalletSchema = createWalletSchema.partial();

export type createWalletDTO = z.infer<typeof createWalletSchema>;
export type updateWalletDTO = z.infer<typeof updateWalletSchema>;
