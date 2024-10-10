import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // FIXME Duplicated code
    const session = await auth();
    const body = await req.json();

    const { name, value } = body;

    if (!session?.user?.id) {
      return new NextResponse('Unauthenticated!', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required!', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Value is required!', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required!', { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId: session.user.id },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized!', { status: 403 });
    }

    const material = await db.material.create({
      data: { name, value, storeId: params.storeId },
    });

    return NextResponse.json(material);
  } catch (error) {
    console.log('[MATERIAL_POST]', error);
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

    const materials = await db.material.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(materials);
  } catch (error) {
    console.log('[MATERIALS_GET]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}
