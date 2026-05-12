import z from 'zod';

export const createGoalSchema = z.object({
  name: z.string(),
  color: z.string(),
  target_amount: z.number().default(0),
  emoji: z.string().default(''),
  currency_id: z.string(),
});

export const updateGoalSchema = createGoalSchema.partial();

export type createGoalDTO = z.infer<typeof createGoalSchema>;
export type updateGoalDTO = z.infer<typeof updateGoalSchema>;
