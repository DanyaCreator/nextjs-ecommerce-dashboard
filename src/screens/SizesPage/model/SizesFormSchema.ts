import * as z from 'zod';

export const SizesFormSchema = z.object({
  value: z.coerce.number().min(1),
  categoryId: z.string().min(1),
});
