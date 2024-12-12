import { NextResponse } from 'next/server';

import { db } from '@/lib';
import { validateAndAuthorize } from '@/shared/api';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const res = await validateAndAuthorize(params.storeId);
    if (res) return res.error;

    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse('Name is required!', { status: 400 });
    }

    if (params.categoryId === 'undefined')
      return new NextResponse('Category id is required!', { status: 400 });

    const updatedCategory = await db.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: { name },
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
    const res = await validateAndAuthorize(params.storeId);
    if (res) return res.error;

    if (!params.categoryId) {
      return new NextResponse('Category id is required!', { status: 400 });
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
      include: { sizes: true },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}
