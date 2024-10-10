import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!session?.user?.id)
      return new NextResponse('Unauthenticated', { status: 401 });

    if (!name) {
      return new NextResponse('Name is required!', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard id is required!', { status: 400 });
    }

    if (!params.storeId)
      return new NextResponse('Store id is required!', { status: 400 });

    if (!params.categoryId)
      return new NextResponse('Category id is required!', { status: 400 });

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId: session.user.id },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized!', { status: 403 });
    }

    const updatedCategory = await db.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: { name, billboardId },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id)
      return new NextResponse('Unauthorized', { status: 401 });

    if (!params.categoryId) {
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

    const category = await db.category.deleteMany({
      where: { id: params.categoryId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse('Category id is required!', { status: 400 });
    }

    const category = await db.category.findUnique({
      where: { id: params.categoryId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}