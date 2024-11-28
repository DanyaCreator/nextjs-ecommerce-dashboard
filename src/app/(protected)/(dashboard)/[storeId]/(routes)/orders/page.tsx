import React from 'react';
import { OrdersPage } from '@/pages/OrdersPage';

type OrdersProps = {
  params: { storeId: string };
};

const Orders = ({ params }: OrdersProps) => {
  return <OrdersPage storeId={params.storeId} />;
};

export default Orders;
