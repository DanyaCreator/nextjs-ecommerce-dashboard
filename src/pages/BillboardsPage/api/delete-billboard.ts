'use server';

import { auth } from '@/auth';
import { db } from '@/lib';
import { getBillboardById } from '@/shared/model/billboard';

export const deleteBillboard = async (
  billboardId?: string,
  storeId?: string
) => {
  const session = await auth();
  const billboard = await getBillboardById(billboardId);

  if (!billboard) return { error: 'Cannot find billboard!' };

  const storeByUserId = await db.store.findFirst({
    where: { userId: session?.user?.id, id: storeId },
  });

  if (!storeByUserId) return { error: 'Unauthorized!' };

  try {
    await db.billboard.delete({ where: { id: billboardId } });

    return { success: 'Billboard deleted!' };
  } catch {
    return { error: 'Internal error!' };
  }
};
