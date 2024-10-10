import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; materialId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();

    const { name, value } = body;

    if (!session?.user?.id)
      return new NextResponse('Unauthenticated', { status: 401 });

    if (!name) {
      return new NextResponse('Name is required!', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Value is required!', { status: 400 });
    }

    if (!params.storeId)
      return new NextResponse('Store id is required!', { status: 400 });

    if (!params.materialId)
      return new NextResponse('Material id is required!', { status: 400 });

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId: session.user.id },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized!', { status: 403 });
    }

    const updatedMaterial = await db.material.updateMany({
      where: {
        id: params.materialId,
      },
      data: { name, value },
    });

    return NextResponse.json(updatedMaterial);
  } catch (error) {
    console.log('[MATERIAL_PATCH]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; materialId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id)
      return new NextResponse('Unauthorized', { status: 401 });

    if (!params.materialId) {
      return new NextResponse('Material id is required!', { status: 400 });
    }

    if (!params.storeId)
      return new NextResponse('Store id is required!', { status: 400 });

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId: session.user.id },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized!', { status: 403 });
    }

    const material = await db.material.deleteMany({
      where: { id: params.materialId },
    });

    return NextResponse.json(material);
  } catch (error) {
    console.log('[MATERIAL_DELETE]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { materialId: string } }
) {
  try {
    if (!params.materialId) {
      return new NextResponse('Material id is required!', { status: 400 });
    }

    const material = await db.material.findUnique({
      where: { id: params.materialId },
    });

    return NextResponse.json(material);
  } catch (error) {
    console.log('[MATERIAL_GET]', error);
    return new NextResponse('Internal error!', { status: 500 });
  }
}
