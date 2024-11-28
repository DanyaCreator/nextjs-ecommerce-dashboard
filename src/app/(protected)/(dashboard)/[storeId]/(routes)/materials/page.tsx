import React from 'react';
import { MaterialsPage } from '@/pages/MaterialsPage';

type MaterialsProps = {
  params: { storeId: string };
};

const Materials = ({ params }: MaterialsProps) => {
  return <MaterialsPage storeId={params.storeId} />;
};

export default Materials;
