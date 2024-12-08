import { NextResponse } from 'next/server';

import { db } from '@/lib';
import { validateAndAuthorize } from '@/shared/api';

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { storeId: string; productId: string; reviewId: string } }
) {
  try {
    const res = await validateAndAuthorize(params.storeId);
    if (res) return res.error;

    if (!params.reviewId) {
      return new NextResponse('Review id is required!', { status: 400 });
    }

    const review = await db.productReview.deleteMany({
      where: { id: params.reviewId },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log('[REVIEW_DELETE]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}
