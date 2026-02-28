import z from 'zod';

export const createTypeSchema = z.object({
  name: z.string(),
});

export const updateTypeSchema = createTypeSchema.partial();

export type createTypeDTO = z.infer<typeof createTypeSchema>;
export type updateTypeDTO = z.infer<typeof updateTypeSchema>;
