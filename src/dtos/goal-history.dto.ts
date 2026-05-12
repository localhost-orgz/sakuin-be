import z from 'zod';

export const goalHistoryTypeEnum = z.enum(['Deposit', 'Withdrawal']);

export const createGoalHistorySchema = z.object({
  goal_id: z.string(),
  amount: z.number(),
  type: goalHistoryTypeEnum,
});

export const updateGoalHistorySchema = createGoalHistorySchema.partial().omit({ goal_id: true });

export type createGoalHistoryDTO = z.infer<typeof createGoalHistorySchema>;
export type updateGoalHistoryDTO = z.infer<typeof updateGoalHistorySchema>;
