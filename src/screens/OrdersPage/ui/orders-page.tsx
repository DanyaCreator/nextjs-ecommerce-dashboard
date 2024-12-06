import { format } from 'date-fns';

import { db } from '@/lib';
import { OrderColumn, OrdersTable } from '@/features/Order';
import { OrdersHeader } from '@/entities/Orders';
import { formatter } from '@/shared/lib/utils';

type OrdersPageProps = {
  storeId: string;
};

export const OrdersPage = async ({ storeId }: OrdersPageProps) => {
  const orders = await db.order.findMany({
    where: { storeId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedOrderItems: OrderColumn[] = orders.map((i) => ({
    id: i.id,
    products: i.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(', '),
    phone: i.phone,
    address: i.address,
    totalPrice: formatter.format(
      i.orderItems.reduce(
        (total, item) => total + Number(item.product.price),
        0
      )
    ),
    isPaid: i.isPaid,
    createdAt: format(i.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl overflow-hidden'>
      <div className='h-full overflow-auto px-3'>
        <section className='flex-1'>
          <OrdersHeader ordersCount={orders.length} />
        </section>
        <section className='mt-6'>
          <OrdersTable data={formattedOrderItems} />
        </section>
      </div>
    </main>
  );
};
