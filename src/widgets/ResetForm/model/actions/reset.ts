'use server';

import * as z from 'zod';
import { getUserByEmail } from '@/shared/model';
import { generatePasswordResetToken } from '../../data';
import { sendPasswordResetEmail } from '../../lib';
import { ResetSchema } from '../schemas';

export const reset = async (data: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid email!' };
  }

  const { email } = validatedFields.data;
  const excitingUser = await getUserByEmail(email);

  if (!excitingUser) {
    return { error: 'Email not found!' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: 'Reset email sent!' };
};
