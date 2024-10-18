import * as z from 'zod';

export const ProductFormSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  materialId: z.string().min(1),
  sizeId: z.string().min(1),
  billboardId: z.string().min(1).optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});
