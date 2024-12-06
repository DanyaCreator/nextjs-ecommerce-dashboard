import React from 'react';
// eslint-disable-next-line import/no-internal-modules
import { CategoriesPage } from '@/screens/CategoriesPage';

type CategoriesProps = {
  params: { storeId: string };
};

const Categories = ({ params }: CategoriesProps) => {
  return <CategoriesPage storeId={params.storeId} />;
};

export default Categories;
