'use client';

import { Material } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { EntityCellActions } from '@/shared/ui';

export type MaterialColumn = {
  id: string;
  value: string;
  createdAt: string;
  initialData: Material;
};

export const columns: ColumnDef<MaterialColumn>[] = [
  {
    accessorKey: 'value',
    header: 'Value',
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
        entityName='Material'
        entityEndpoint='materials'
        entityInitialData={row.original.initialData}
      />
    ),
  },
];
