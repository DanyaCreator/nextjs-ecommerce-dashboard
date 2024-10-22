'use client';

import { ColumnDef } from '@tanstack/react-table';
import { EntityCellActions } from '@/shared/ui';

export type SizeColumn = {
  id: string;
  value: string;
  category: string;
  createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: 'value',
    header: 'Value',
  },
  {
    accessorKey: 'category',
    header: 'Category',
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
        entityName='Size'
        entityEndpoint='sizes'
      />
    ),
  },
];
