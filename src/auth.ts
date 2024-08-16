import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { db } from '@/lib';
import authConfig from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
