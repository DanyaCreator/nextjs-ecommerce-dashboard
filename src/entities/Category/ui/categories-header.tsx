import { EntityHeader } from '@/shared/ui';
import { CategoryForm } from './categories-form';

type CategoryHeaderProps = {
  categoriesCount: number;
};

export const CategoriesHeader = ({ categoriesCount }: CategoryHeaderProps) => {
  return (
    <EntityHeader entityName='categories' entityCount={categoriesCount}>
      <CategoryForm
        initialData={null}
        title={'Create a category'}
        description={'Enter the name of category'}
      />
    </EntityHeader>
  );
};
