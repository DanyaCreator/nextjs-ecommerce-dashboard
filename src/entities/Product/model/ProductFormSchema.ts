import * as z from 'zod';

export const ProductFormSchema = z.object({
  images: z.object({ url: z.string() }).array(),
  name: z.string().min(1),
  price: z.coerce.number().min(1),
  weight: z.coerce.number().min(1),
  description: z.string().min(1),
  categoryId: z.string().min(1),
  materialId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});