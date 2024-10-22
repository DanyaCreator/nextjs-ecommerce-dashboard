import { NextResponse } from 'next/server';

import { db } from '@/lib';
import { validateAndAuthorize } from '@/shared/api';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; materialId: string } }
) {
  try {
    const res = await validateAndAuthorize(params.storeId);
    if (res) return res.error;

    const body = await req.json();

    const { value } = body;

    if (!value) {
      return new NextResponse('Value is required!', { status: 400 });
    }

    if (!params.materialId)
      return new NextResponse('Material id is required!', { status: 400 });

    const updatedMaterial = await db.material.updateMany({
      where: {
        id: params.materialId,
      },
      data: { value },
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
    const res = await validateAndAuthorize(params.storeId);
    if (res) return res.error;

    if (!params.materialId) {
      return new NextResponse('Material id is required!', { status: 400 });
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
