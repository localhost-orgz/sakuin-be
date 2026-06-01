import z from 'zod';

export const createGoalHistorySchema = z.object({
  goal_id: z.string(),
  amount: z.string().transform((val) => {
    const parsed = Number(val);
    return parsed;
  }),
  type: z.enum(['saving', 'withdraw']),
  date: z.coerce.date(),
});

export const updateGoalHistorySchema = createGoalHistorySchema.partial();

export type createGoalHistoryDTO = z.infer<typeof createGoalHistorySchema>;
export type updateGoalHistoryDTO = z.infer<typeof updateGoalHistorySchema>;