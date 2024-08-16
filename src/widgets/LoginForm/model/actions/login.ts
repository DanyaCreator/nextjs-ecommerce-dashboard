'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';
import { db } from '@/shared/lib';
import { getUserByEmail } from '@/shared/model';
import { LoginSchema } from '../schemas';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'Invalid fields' };

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: 'Email already in use!' };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: 'User created!' };
};
