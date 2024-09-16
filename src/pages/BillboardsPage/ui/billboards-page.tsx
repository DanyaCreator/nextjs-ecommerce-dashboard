import { format } from 'date-fns';

import { db } from '@/lib';
import { dmSans } from '@/shared/assets/fonts';
import { ApiList } from './api-list';
import { BillboardsHeader } from './billboards-header';
import { BillboardsTable } from './billboards-table';
import { BillboardColumn } from './columns';

type BillboardsPageProps = {
  storeId: string;
};

export const BillboardsPage = async ({ storeId }: BillboardsPageProps) => {
  const billboards = await db.billboard.findMany({
    where: { storeId },
    orderBy: { createdAt: 'desc' },
  });

  const formattedBillboardItems: BillboardColumn[] = billboards.map((i) => ({
    id: i.id,
    label: i.label,
    createdAt: format(i.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl'>
      <section className='flex-1'>
        <BillboardsHeader billboardsCount={billboards.length} />
      </section>
      <section className='mt-6'>
        <BillboardsTable data={formattedBillboardItems} />
      </section>
      <section>
        <div>
          <h1 className={`${dmSans.className}`}>API</h1>
          <span className={`${dmSans.className} text-dark-gray`}>
            API calls for stores
          </span>
        </div>
        <div className='flex flex-col'>
          <ApiList entityName='billbooards' entityIdName={'billboardId'} />
        </div>
      </section>
    </main>
  );
};
