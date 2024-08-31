import * as z from 'zod';

export const ModalStoreSchema = z.object({
  name: z.string().min(1),
});
