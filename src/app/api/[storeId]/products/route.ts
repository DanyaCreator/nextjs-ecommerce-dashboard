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

    const {
      categoryId,
      name,
      price,
      weight,
      description,
      isArchived,
      inStock,
      onSale,
      sale,
      sizeId,
      materialId,
      images,
    } = body;

    for (const key of Object.keys(body)) {
      if (
        body[key] ||
        ['inStock', 'isArchived', 'onSale', 'sale'].includes(key)
      )
        continue;

      return new NextResponse(`${key} is required!`, { status: 400 });
    }

    const product = await db.product.create({
      data: {
        categoryId,
        name,
        price,
        weight,
        description,
        isArchived,
        inStock,
        onSale,
        sale,
        sizeId,
        materialId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_POST]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);

    const categoryId = searchParams.get('categoryId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const materialId = searchParams.get('materialId') || undefined;

    if (!params.storeId) {
      return new NextResponse('Store id is required!', { status: 400 });
    }

    const products = await db.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        materialId,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        material: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // const products = await db.product.findMany({
    //   where: { storeId: params.storeId },
    // });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}
