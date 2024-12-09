'use client';

import { Product } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { EntityCellActions } from '@/shared/ui';

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
  material: string;
  isPinnedOnBillboard: boolean;
  isArchived: boolean;
  inStock: boolean;
  sale: string;
  createdAt: string;
  initialData: Product;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'inStock',
    header: 'InStock',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'isPinnedOnBillboard',
    header: 'Billboard',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'sale',
    header: 'Sale',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'material',
    header: 'Material',
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
        entityName='Product'
        entityEndpoint='products'
        entityInitialData={row.original.initialData}
        productCellActions
      />
    ),
  },
];
