import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();

    const { name } = body;

    if (!session?.user?.id)
      return new NextResponse('Unauthorized', { status: 401 });

    if (!name) return new NextResponse('Name is required!', { status: 400 });

    if (!params.storeId)
      return new NextResponse('Store id is required!', { status: 400 });

    const updatedStore = await db.store.updateMany({
      where: {
        id: params.storeId,
      },
      data: { name },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id)
      return new NextResponse('Unauthorized', { status: 401 });

    if (!params.storeId)
      return new NextResponse('Store id is required!', { status: 400 });

    const store = await db.store.deleteMany({ where: { id: params.storeId } });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse('Store id is required!', { status: 400 });

    const store = await db.store.findUnique({ where: { id: params.storeId } });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_GET]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}
