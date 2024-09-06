'use server';

import * as z from 'zod';

import { db } from '@/lib';
import { getStoreById } from '@/shared/model';
import { SettingsFormSchema } from '../model';

export const renameStore = async (
  data: z.infer<typeof SettingsFormSchema>,
  storeId?: string
) => {
  const validatedFields = SettingsFormSchema.safeParse(data);

  if (!validatedFields.success) return { error: 'Invalid fields!' };

  const { name } = validatedFields.data;

  const store = await getStoreById(storeId);

  if (!store) return { error: 'Cannot find store!' };

  try {
    const updatedStore = await db.store.updateMany({
      where: {
        id: storeId,
      },
      data: { name },
    });

    return { success: 'Store renamed!', data: updatedStore };
  } catch {
    return { error: 'Internal error!' };
  }
};
