import { db } from '@/lib';

export const getBillboardById = async (billboardId?: string) => {
  try {
    return db.billboard.findUnique({ where: { id: billboardId } });
  } catch {
    return null;
  }
};
