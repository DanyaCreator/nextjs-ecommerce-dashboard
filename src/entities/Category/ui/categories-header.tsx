'use client';

import { Category } from '@prisma/client';

import { useModalWrapper } from '@/shared/model';
import { EntityHeader } from '@/shared/ui';
import { CategoryForm } from './categories-form';

type CategoryHeaderProps = {
  categoriesCount: number;
};

export const CategoriesHeader = ({ categoriesCount }: CategoryHeaderProps) => {
  const modalInitialData = useModalWrapper((state) => state.initialData);

  const title = modalInitialData ? 'Update a category' : 'Create a category';
  const description = modalInitialData
    ? 'Change the name of your category'
    : 'Enter the name of category';

  return (
    <EntityHeader entityName='categories' entityCount={categoriesCount}>
      <CategoryForm
        initialData={modalInitialData as Category}
        title={title}
        description={description}
      />
    </EntityHeader>
  );
};
