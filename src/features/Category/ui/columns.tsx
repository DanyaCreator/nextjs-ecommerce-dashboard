'use client';

import { Category } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { EntityCellActions } from '@/shared/ui';

export type CategoryColumn = {
  id: string;
  name: string;
  createdAt: string;
  initialData: Category;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
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
        entityName='Category'
        entityEndpoint='categories'
        entityInitialData={row.original.initialData}
      />
    ),
  },
];
