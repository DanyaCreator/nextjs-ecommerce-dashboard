import { format } from 'date-fns';

import { db } from '@/lib';
import { ApiData, ApiList } from '@/widgets/ApiList';
import { BillboardColumn, BillboardsTable } from '@/features/Billboard';
import { BillboardsHeader } from '@/entities/Billboard';

type BillboardsPageProps = {
  storeId: string;
};

const apiCalls: ApiData[] = [
  {
    title: 'GET',
    endpoint: 'billboards',
    variant: 'public',
  },
  {
    title: 'POST',
    endpoint: 'billboards',
    variant: 'admin',
  },
  {
    title: 'GET',
    endpoint: 'billboards/{billboardId}',
    variant: 'public',
  },
  {
    title: 'PATCH',
    endpoint: 'billboards/{billboardId}',
    variant: 'admin',
  },
  {
    title: 'DELETE',
    endpoint: 'billboards/{billboardId}',
    variant: 'admin',
  },
];

export const BillboardsPage = async ({ storeId }: BillboardsPageProps) => {
  const billboards = await db.billboard.findMany({
    where: { storeId },
    include: {
      product: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedBillboardItems: BillboardColumn[] = billboards.map((i) => ({
    id: i.id,
    label: i.label,
    product: i.product.name,
    createdAt: format(i.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl overflow-hidden'>
      <div className='h-full overflow-auto px-3'>
        <section className='flex-1'>
          <BillboardsHeader billboardsCount={billboards.length} />
        </section>
        <section className='mt-6'>
          <BillboardsTable data={formattedBillboardItems} />
        </section>
        <section>
          <ApiList data={apiCalls} entityName='billboards' />
        </section>
      </div>
    </main>
  );
};
