'use server';

import * as z from 'zod';

import { db } from '@/lib';
import { getUserById } from '@/shared/model';
import { ModalStoreSchema } from '../model';

export const createStore = async (
  data: z.infer<typeof ModalStoreSchema>,
  userId?: string
) => {
  const validatedFields = ModalStoreSchema.safeParse(data);

  if (!validatedFields.success) return { error: 'Invalid fields' };

  const { name } = validatedFields.data;

  if (!userId) return { error: 'Unauthorized!' };
  const user = await getUserById(userId);

  if (!user) return { error: 'Can not find user!' };

  try {
    const newStore = await db.store.create({
      data: {
        userId,
        name,
      },
    });

    return { success: 'Store is created!', data: newStore };
  } catch (err) {
    return { error: 'Internal error!' };
  }
};
