import React from 'react';
// eslint-disable-next-line import/no-internal-modules
import { ProductsPage } from '@/screens/ProductsPage';

type ProductsProps = {
  params: { storeId: string };
};

const Products = ({ params }: ProductsProps) => {
  return <ProductsPage storeId={params.storeId} />;
};

export default Products;
