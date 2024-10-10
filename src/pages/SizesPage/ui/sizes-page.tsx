import { format } from 'date-fns';

import { db } from '@/lib';
import { ApiData, ApiList } from '@/widgets/ApiList';
import { SizeColumn, SizesTable } from '@/features/Size'
import { SizesHeader } from '@/entities/Size';

type SizesPageProps = {
  storeId: string;
};

const apiCalls: ApiData[] = [
  {
    title: 'GET',
    endpoint: 'sizes',
    variant: 'public',
  },
  {
    title: 'POST',
    endpoint: 'sizes',
    variant: 'admin',
  },
  {
    title: 'GET',
    endpoint: 'sizes/{sizeId}',
    variant: 'public',
  },
  {
    title: 'PATCH',
    endpoint: 'sizes/{sizeId}',
    variant: 'admin',
  },
  {
    title: 'DELETE',
    endpoint: 'sizes/{sizeId}',
    variant: 'admin',
  },
];

export const SizesPage = async ({ storeId }: SizesPageProps) => {
  const sizes = await db.size.findMany({
    where: { storeId },
    orderBy: { createdAt: 'desc' },
  });

  const formattedSizeItems: SizeColumn[] = sizes.map((i) => ({
    id: i.id,
    name: i.name,
    value: i.value,
    createdAt: format(i.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl'>
      <div className='h-full overflow-auto px-3'>
        <section className='flex-1'>
          <SizesHeader sizesCount={sizes.length} />
        </section>
        <section className='mt-6'>
          <SizesTable data={formattedSizeItems} />
        </section>
        <section>
          <ApiList data={apiCalls} entityName='sizes' />
        </section>
      </div>
    </main>
  );
};
