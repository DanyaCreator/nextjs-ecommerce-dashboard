import * as z from 'zod';

export const BillboardFormSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
  productId: z.string().min(1),
});
