'use client';

import { Category } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { CategoryForm } from '@/entities/Category';
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
        entityEndpoint='categories'>
        <CategoryForm
          initialData={row.original.initialData}
          title={'Update category'}
          description={'Change the name of your category'}
        />
      </EntityCellActions>
    ),
  },
];
