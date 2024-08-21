'use server';

// FIXME Refactor get token by token
import bcrypt from 'bcryptjs';
import * as z from 'zod';
import { db } from '@/lib';
import { getUserByEmail } from '@/shared/model';
import { NewPasswordSchema } from '../../model';

export const newPassword = async (
  data: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: 'Missing token!' };
  }

  const validatedFields = NewPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { password } = validatedFields.data;

  const excitingToken = await db.resetPasswordToken.findUnique({
    where: { token: token },
  });

  if (!excitingToken) {
    return { error: 'Invalid token!' };
  }

  const hasExpires = new Date(excitingToken.expires) < new Date();

  if (hasExpires) {
    return { error: 'Token has expires' };
  }

  const excitingUser = await getUserByEmail(excitingToken.email);

  if (!excitingUser) {
    return { error: 'Email does not exist!' };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: excitingUser.id },
    data: { password: hashedPassword },
  });

  return { success: 'Password updated!' };
};
