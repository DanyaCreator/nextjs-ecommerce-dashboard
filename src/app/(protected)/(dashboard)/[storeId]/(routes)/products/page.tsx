import React from 'react';
import { ProductsPage } from '@/pages/ProductsPage';

type ProductsProps = {
  params: { storeId: string };
};

const Products = ({ params }: ProductsProps) => {
  return <ProductsPage storeId={params.storeId} />;
};

export default Products;
