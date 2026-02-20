import z from 'zod';

//! zod docs: https://zod.dev/basics
export const createCategorySchema = z.object({
  name: z.string(),
  icon_url: z.url(),
});

export const updateCategorySchema = createCategorySchema.partial();

export type createCategoryDTO = z.infer<typeof createCategorySchema>;
export type updateCategoryDTO = z.infer<typeof updateCategorySchema>;
