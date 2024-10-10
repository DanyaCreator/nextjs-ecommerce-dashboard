import React from 'react';
import { SizesPage } from '@/pages/SizesPage';

type SizesProps = {
  params: { storeId: string };
};

const Sizes = ({ params }: SizesProps) => {
  return <SizesPage storeId={params.storeId} />;
};

export default Sizes;
