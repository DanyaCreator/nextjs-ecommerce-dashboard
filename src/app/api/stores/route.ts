import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib';

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    const { name } = body;

    if (!session?.user?.id)
      return new NextResponse('Unauthorized', { status: 401 });

    if (!name) return new NextResponse('Name is required!', { status: 400 });

    const store = await db.store.create({
      data: {
        name,
        userId: session.user.id,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
