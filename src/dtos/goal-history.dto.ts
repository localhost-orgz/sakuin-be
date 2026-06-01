import z from 'zod';

export const createGoalHistorySchema = z.object({
  goal_id: z.string(),
  amount: z.number().positive('Jumlah harus lebih besar dari 0'),
  type: z.enum(['saving', 'withdraw']),
});

export type createGoalHistoryDTO = z.infer<typeof createGoalHistorySchema>;
