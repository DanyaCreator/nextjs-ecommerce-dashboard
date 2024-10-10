import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();

    const { name, value } = body;

    if (!session?.user?.id)
      return new NextResponse('Unauthenticated', { status: 401 });

    if (!name) {
      return new NextResponse('Name is required!', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Value is required!', { status: 400 });
    }

    if (!params.storeId)
      return new NextResponse('Store id is required!', { status: 400 });

    if (!params.sizeId)
      return new NextResponse('Size id is required!', { status: 400 });

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId: session.user.id },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized!', { status: 403 });
    }

    const updatedSize = await db.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: { name, value },
    });

    console.log('updated sizes: ', updatedSize)

    return NextResponse.json(updatedSize);
  } catch (error) {
    console.log('[SIZE_PATCH]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id)
      return new NextResponse('Unauthorized', { status: 401 });

    if (!params.sizeId) {
      return new NextResponse('Category id is required!', { status: 400 });
    }

    if (!params.storeId)
      return new NextResponse('Store id is required!', { status: 400 });

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId: session.user.id },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized!', { status: 403 });
    }

    const size = await db.size.deleteMany({
      where: { id: params.sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse('Size id is required!', { status: 400 });
    }

    const size = await db.size.findUnique({
      where: { id: params.sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}