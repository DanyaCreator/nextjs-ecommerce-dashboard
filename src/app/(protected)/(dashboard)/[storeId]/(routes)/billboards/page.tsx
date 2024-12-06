import React from 'react';
// eslint-disable-next-line import/no-internal-modules
import { BillboardsPage } from '@/screens/BillboardsPage';

type BillboardsProps = {
  params: { storeId: string };
};

const Billboards = ({ params }: BillboardsProps) => {
  return <BillboardsPage storeId={params.storeId} />;
};

export default Billboards;
