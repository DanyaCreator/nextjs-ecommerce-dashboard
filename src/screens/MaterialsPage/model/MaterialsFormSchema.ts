import * as z from 'zod';

export const MaterialsFormSchema = z.object({
  value: z.string().min(1),
});
