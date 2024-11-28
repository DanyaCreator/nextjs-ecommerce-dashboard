'use client';

import { EntityHeader } from '@/shared/ui';

type OrdersHeaderProps = {
  ordersCount?: number;
};

export const OrdersHeader = ({ ordersCount }: OrdersHeaderProps) => {
  return <EntityHeader entityName='orders' entityCount={ordersCount} />;
};
