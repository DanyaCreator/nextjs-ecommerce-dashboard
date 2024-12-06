import React from 'react';
// eslint-disable-next-line import/no-internal-modules
import { MaterialsPage } from '@/screens/MaterialsPage';

type MaterialsProps = {
  params: { storeId: string };
};

const Materials = ({ params }: MaterialsProps) => {
  return <MaterialsPage storeId={params.storeId} />;
};

export default Materials;
