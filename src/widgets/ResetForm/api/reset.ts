'use server';

import * as z from 'zod';
import { generatePasswordResetToken, getUserByEmail } from '@/shared/model';
import { sendPasswordResetEmail } from '../lib';
import { ResetSchema } from '../model';

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
