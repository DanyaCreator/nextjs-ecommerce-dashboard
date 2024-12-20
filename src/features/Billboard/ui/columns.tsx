'use client';

import { Billboard } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { EntityCellActions } from '@/shared/ui';

export type BillboardColumn = {
  id: string;
  label: string;
  product: string;
  createdAt: string;
  initialData: Billboard;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'product',
    header: 'Product',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <EntityCellActions
        entityId={row.original.id}
        entityName='Billboards'
        entityEndpoint='billboards'
        entityInitialData={row.original.initialData}
      />
    ),
  },
];
