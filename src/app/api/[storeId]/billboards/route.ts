import { NextResponse } from 'next/server';

import { db } from '@/lib';
import { validateAndAuthorize } from '@/shared/api';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    const billboard = await db.billboard.create({
      data: { label, imageUrl, productId, storeId: params.storeId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_POST]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required!', { status: 400 });
    }

    const billboards = await db.billboard.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}
