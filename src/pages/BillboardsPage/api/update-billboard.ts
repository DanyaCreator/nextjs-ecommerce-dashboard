'use server';

import * as z from 'zod';

import { auth } from '@/auth';
import { db } from '@/lib';
import { getStoreById } from '@/shared/model';
import { getBillboardById } from '@/shared/model/billboard';
import { BillboardFormSchema } from '../model';

export const updateBillboard = async (
  data: z.infer<typeof BillboardFormSchema>,
  storeId?: string,
  billboardId?: string
) => {
  const session = await auth();
  const validatedFields = BillboardFormSchema.safeParse(data);

  if (!validatedFields.success) return { error: 'Invalid fields!' };

  const { label, imageUrl } = validatedFields.data;

  const store = await getStoreById(storeId);

  if (!store || !storeId) return { error: 'Cannot find store!' };

  const storeByUserId = await db.store.findFirst({
    where: { userId: session?.user?.id, id: storeId },
  });

  if (!storeByUserId) return { error: 'Unauthorized!' };

  const billboard = await getBillboardById(billboardId);

  if (!billboard) return { error: 'Cannot find billboard!' };

  try {
    const updatedBillboard = await db.billboard.updateMany({
      where: {
        id: billboardId,
      },
      data: { label, imageUrl },
    });

    return { success: 'Billboard updated!', data: updatedBillboard };
  } catch {
    return { error: 'Internal error!' };
  }
};
