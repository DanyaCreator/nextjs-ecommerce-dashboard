import { NextResponse } from 'next/server';

import { db } from '@/lib';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const body = await req.json();

    const { text, name, rating } = body;

    if (!text) {
      return new NextResponse('Text is required!', { status: 400 });
    }

    if (!name) {
      return new NextResponse('Name is required!', { status: 400 });
    }

    if (!rating) {
      return new NextResponse('Rating is required!', { status: 400 });
    }

    const review = await db.productReview.create({
      data: { text, name, rating, productId: params.productId },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log('[REVIEWS_POST]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse('Product id is required!', { status: 400 });
    }

    const products = await db.productReview.findMany({
      where: { productId: params.productId },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[REVIEWS_GET]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}
