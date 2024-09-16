import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!session?.user?.id)
      return new NextResponse('Unauthenticated', { status: 401 });

    if (!label) {
      return new NextResponse('Label is required!', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required!', { status: 400 });
    }

    if (!params.storeId)
      return new NextResponse('Store id is required!', { status: 400 });

    if (!params.billboardId)
      return new NextResponse('Billboard id is required!', { status: 400 });

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId: session.user.id },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized!', { status: 403 });
    }

    const updatedStore = await db.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: { label, imageUrl },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id)
      return new NextResponse('Unauthorized', { status: 401 });

    if (!params.billboardId) {
      return new NextResponse('Billboard id is required!', { status: 400 });
    }

    if (!params.storeId)
      return new NextResponse('Store id is required!', { status: 400 });

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId: session.user.id },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized!', { status: 403 });
    }

    const billboard = await db.billboard.deleteMany({
      where: { id: params.billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse('Billboard id is required!', { status: 400 });
    }

    const billboard = await db.billboard.findUnique({
      where: { id: params.billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}
