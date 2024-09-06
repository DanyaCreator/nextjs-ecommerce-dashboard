'use server';

import { db } from '@/lib';
import { getStoreById } from '@/shared/model';

export const deleteStore = async (storeId?: string) => {
  const store = await getStoreById(storeId);

  if (!store) return { error: 'Cannot find store!' };

  try {
    await db.store.delete({ where: { id: storeId } });

    return { success: 'Store deleted!' };
  } catch {
    return { error: 'Internal error!' };
  }
};
