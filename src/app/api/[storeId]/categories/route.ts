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
    const { name } = body;

    if (!name) {
      return new NextResponse('Name is required!', { status: 400 });
    }

    const category = await db.category.create({
      data: { name, storeId: params.storeId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_POST]', error);
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

    const categories = await db.category.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log('[CATEGORIES_GET]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}
