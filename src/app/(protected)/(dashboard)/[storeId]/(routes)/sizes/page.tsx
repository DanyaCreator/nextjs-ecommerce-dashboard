import React from 'react';
// eslint-disable-next-line import/no-internal-modules
import { SizesPage } from '@/screens/SizesPage';

type SizesProps = {
  params: { storeId: string };
};

const Sizes = ({ params }: SizesProps) => {
  return <SizesPage storeId={params.storeId} />;
};

export default Sizes;
