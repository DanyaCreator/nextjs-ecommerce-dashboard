'use server';

import { signOut } from '@/shared/lib';

export async function logout() {
  await signOut();
}
