import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib';
import { getPasswordResetTokenByEmail } from './password-reset-token';

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const excitingToken = await getPasswordResetTokenByEmail(email);

  if (excitingToken) {
    await db.resetPasswordToken.delete({
      where: { id: excitingToken.id },
    });
  }

  const passwordResetToken = await db.resetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
