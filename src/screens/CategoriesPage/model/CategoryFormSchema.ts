import * as z from 'zod';

export const CategoryFormSchema = z.object({
  name: z.string().min(1),
  // billboardId: z.string().min(1, { message: 'Billboard is required!' }),
});
