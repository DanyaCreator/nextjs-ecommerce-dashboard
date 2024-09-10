import React from 'react';
import { BillboardsPage } from '@/pages/BillboardsPage';

type BillboardsProps = {
  params: { storeId: string };
};

const Billboards = ({ params }: BillboardsProps) => {
  return <BillboardsPage />;
};

export default Billboards;
