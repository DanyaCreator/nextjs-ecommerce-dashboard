import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib';

export async function validateAndAuthorize(storeId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: new NextResponse('Unauthenticated!', { status: 401 }) };
  }

  if (!storeId) {
    return {
      error: new NextResponse('Store id is required!', { status: 400 }),
    };
  }

  const storeByUserId = await db.store.findFirst({
    where: { id: storeId, userId: session.user.id },
  });

  if (!storeByUserId) {
    return { error: new NextResponse('Unauthorized!', { status: 403 }) };
  }
}
