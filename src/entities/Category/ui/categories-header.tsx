import { EntityHeader } from '@/shared/ui';

type CategoryHeaderProps = {
  categoriesCount: number;
};

export const CategoriesHeader = ({ categoriesCount }: CategoryHeaderProps) => {
  return <EntityHeader entityName='categories' entityCount={categoriesCount} />;
};
