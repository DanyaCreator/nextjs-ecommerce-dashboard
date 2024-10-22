import { NextResponse } from 'next/server';

import { db } from '@/lib';
import { validateAndAuthorize } from '@/shared/api';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const res = await validateAndAuthorize(params.storeId);
    if (res) return res.error;

    const body = await req.json();
    const { value, categoryId } = body;

    if (!value) {
      return new NextResponse('Value is required!', { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse('CategoryID is required!', { status: 400 });
    }

    if (!params.sizeId)
      return new NextResponse('Size id is required!', { status: 400 });

    const updatedSize = await db.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: { value, categoryId },
    });

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
    const res = await validateAndAuthorize(params.storeId);
    if (res) return res.error;

    if (!params.sizeId) {
      return new NextResponse('Category id is required!', { status: 400 });
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
