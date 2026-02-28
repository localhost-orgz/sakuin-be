import z from 'zod';

export const createCurrencySchema = z.object({
  code: z.string().min(2).max(10),
  country: z.string(),
});

export const updateCurrencySchema = createCurrencySchema.partial();

export type createCurrencyDTO = z.infer<typeof createCurrencySchema>;
export type updateCurrencyDTO = z.infer<typeof updateCurrencySchema>;
