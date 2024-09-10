'use server';

import * as z from 'zod';

import { auth } from '@/auth';
import { db } from '@/lib';
import { getStoreById } from '@/shared/model';
import { BillboardFormSchema } from '../model';

export const createBillboard = async (
  data: z.infer<typeof BillboardFormSchema>,
  storeId?: string
) => {
  const session = await auth();
  const validatedFields = BillboardFormSchema.safeParse(data);

  if (!validatedFields.success) return { error: 'Invalid fields!' };

  const store = await getStoreById(storeId);

  if (!store || !storeId) return { error: 'Cannot find store!' };

  const { label, imageUrl } = validatedFields.data;

  const storeByUserId = await db.store.findFirst({
    where: { userId: session?.user?.id, id: storeId },
  });

  if (!storeByUserId) return { error: 'Unauthorized!' };

  try {
    await db.billboard.create({
      data: { label, imageUrl, storeId },
    });
    return { success: 'Billboard created!' };
  } catch {
    return { error: 'Internal error!' };
  }
};
