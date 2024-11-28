import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import * as z from 'zod';

import { db } from '@/lib';

const AuthSchema = z.object({
  email: z.string().email({ message: 'Invalid email!' }),
  password: z.string().min(1, { message: 'Password is required!' }),
});

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = AuthSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.user.findUnique({ where: { email } });
          if (!user || !user.password || user.role !== 'ADMIN') return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
