import { NextResponse } from 'next/server';

import { db } from '@/lib';
import { validateAndAuthorize } from '@/shared/api';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const res = await validateAndAuthorize(params.storeId);
    if (res) return res.error;

    const body = await req.json();

    const {
      categoryId,
      name,
      price,
      weight,
      description,
      isFeatured,
      isArchived,
      sizeId,
      materialId,
      images,
    } = body;

    for (const key of Object.keys(body)) {
      if (body[key] || key === 'isArchived' || key === 'isFeatured') continue;

      return new NextResponse(`${key} is required!`, { status: 400 });
    }

    if (!params.productId)
      return new NextResponse('Product id is required!', { status: 400 });

    await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        categoryId,
        name,
        price,
        weight,
        description,
        isFeatured,
        isArchived,
        sizeId,
        materialId,
        images: { deleteMany: {} },
      },
    });

    const updatedProduct = await db.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const res = await validateAndAuthorize(params.storeId);
    if (res) return res.error;

    if (!params.productId) {
      return new NextResponse('Product id is required!', { status: 400 });
    }

    const product = await db.product.deleteMany({
      where: { id: params.productId },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse('Product id is required!', { status: 400 });
    }

    const product = await db.product.findUnique({
      where: { id: params.productId },
      include: {
        material: true,
        category: true,
        size: true,
        images: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}
