import z from 'zod';

export const createGoalHistorySchema = z.object({
  goal_id: z.string(),
  amount: z.string(),
  type: z.enum(['saving', 'withdraw']),
  date: z.coerce.date(),
});

export type createGoalHistoryDTO = z.infer<typeof createGoalHistorySchema>;
