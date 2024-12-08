'use client';

import { ColumnDef } from '@tanstack/react-table';
import { EntityCellActions } from '@/shared/ui';

export type ReviewColumn = {
  id: string;
  productName: string;
  productId: string;
  text: string;
  name: string;
  rating: number;
  createdAt: string;
};

export const columns: ColumnDef<ReviewColumn>[] = [
  {
    accessorKey: 'productName',
    header: 'Product Name',
  },
  {
    accessorKey: 'text',
    header: 'Text',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created at',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <EntityCellActions
        entityName='Product review'
        entityId={row.original.id}
        entityEndpoint={`/products/${row.original.productId}/reviews`}
        entityInitialData={null}
      />
    ),
  },
];
