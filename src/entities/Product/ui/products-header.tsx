import { EntityHeader } from '@/shared/ui';

type ProductsHeaderProps = {
  productsCount?: number;
};

export const ProductsHeader = ({ productsCount }: ProductsHeaderProps) => {
  return <EntityHeader entityName='products' entityCount={productsCount} />;
};
