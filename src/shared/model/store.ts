import { db } from '@/lib';

export const getStoreById = async (storeId?: string) => {
  try {
    return db.store.findUnique({ where: { id: storeId } });
  } catch {
    return null;
  }
};
