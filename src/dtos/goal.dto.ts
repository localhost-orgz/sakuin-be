import z from 'zod';

export const createGoalSchema = z.object({
  name: z.string(),
  emoticon: z.string(),
  target_amount: z.number(),
  color: z.string().optional(),
});

export const updateGoalSchema = createGoalSchema.partial();

export type createGoalDTO = z.infer<typeof createGoalSchema>;
export type updateGoalDTO = z.infer<typeof updateGoalSchema>;
