'use client';

import { ColumnDef } from '@tanstack/react-table';
import { EntityCellActions } from '@/shared/ui';
import { CategoryForm } from '@/entities/Category/ui/categories-form';

export type CategoryColumn = {
  id: string;
  name: string;
  createdAt: string;
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
          initialData={null}
          title={'Update category'}
          description={'Change the name of your category'}
        />
      </EntityCellActions>
    ),
  },
];
