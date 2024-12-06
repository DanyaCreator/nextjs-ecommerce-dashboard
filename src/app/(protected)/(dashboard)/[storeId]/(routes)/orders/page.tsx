import React from 'react';
// eslint-disable-next-line import/no-internal-modules
import { OrdersPage } from '@/screens/OrdersPage';

type OrdersProps = {
  params: { storeId: string };
};

const Orders = ({ params }: OrdersProps) => {
  return <OrdersPage storeId={params.storeId} />;
};

export default Orders;
