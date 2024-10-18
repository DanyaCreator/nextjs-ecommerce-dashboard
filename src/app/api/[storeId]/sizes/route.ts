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
    const { name, value } = body;

    if (!name) {
      return new NextResponse('Name is required!', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Value is required!', { status: 400 });
    }

    const size = await db.size.create({
      data: { name, value, storeId: params.storeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_POST]', error);
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

    const sizes = await db.size.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log('[SIZES_GET]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}
