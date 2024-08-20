import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { db } from '@/lib';
import authConfig from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async session({ token, session }) {
      console.log({
        sessionToken: token,
      });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const excitingUser = await db.user.findUnique({
        where: { id: token.sub },
      });

      if (!excitingUser) return token;

      token.role = excitingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
