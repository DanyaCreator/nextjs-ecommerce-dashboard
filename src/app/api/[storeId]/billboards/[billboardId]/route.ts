import { NextResponse } from 'next/server';

import { db } from '@/lib';
import { validateAndAuthorize } from '@/shared/api';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const res = await validateAndAuthorize(params.storeId);
    if (res) return res.error;

    const body = await req.json();
    const { label, imageUrl, productId } = body;

    if (!label) {
      return new NextResponse('Label is required!', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required!', { status: 400 });
    }

    if (!productId) {
      return new NextResponse('Product id is required!', { status: 400 });
    }

    if (!params.billboardId)
      return new NextResponse('Billboard id is required!', { status: 400 });

    const updatedStore = await db.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: { label, imageUrl, productId },
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
    const res = await validateAndAuthorize(params.storeId);
    if (res) return res.error;

    if (!params.billboardId) {
      return new NextResponse('Billboard id is required!', { status: 400 });
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
