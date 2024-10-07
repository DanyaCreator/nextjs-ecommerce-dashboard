import React from 'react';
import { CategoriesPage } from '@/pages/CategoriesPage';

type CategoriesProps = {
  params: { storeId: string };
};

const Categories = ({ params }: CategoriesProps) => {
  return <CategoriesPage storeId={params.storeId} />;
};

export default Categories;
