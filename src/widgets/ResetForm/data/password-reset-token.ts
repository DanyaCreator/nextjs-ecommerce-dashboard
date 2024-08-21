import { db } from '@/lib';

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    return await db.resetPasswordToken.findUnique({
      where: { token },
    });
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    return await db.resetPasswordToken.findFirst({
      where: { email },
    });
  } catch {
    return null;
  }
};
