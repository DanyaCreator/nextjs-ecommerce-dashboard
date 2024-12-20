import { db } from '@/lib';

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch {
    return null;
  }
};

export const getUserById = async (userId: string) => {
  try {
    return await db.user.findUnique({ where: { id: userId } });
  } catch {
    return null;
  }
};
