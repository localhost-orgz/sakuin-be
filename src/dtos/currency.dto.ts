import z from 'zod';

export const createCurrencySchema = z.object({
  name: z.string().min(1),
  symbol: z.string().min(1),
  code: z.string().min(2).max(10),
  flag: z.string().min(1)
});

export const updateCurrencySchema = createCurrencySchema.partial();

export type createCurrencyDTO = z.infer<typeof createCurrencySchema>;
export type updateCurrencyDTO = z.infer<typeof updateCurrencySchema>;
