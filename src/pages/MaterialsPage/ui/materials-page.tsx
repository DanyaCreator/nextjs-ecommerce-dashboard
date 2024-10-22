import { format } from 'date-fns';

import { db } from '@/lib';
import { ApiData, ApiList } from '@/widgets/ApiList';
import { MaterialColumn, MaterialsTable } from '@/features/Material';
import { MaterialsHeader } from '@/entities/Material';

type MaterialsPageProps = {
  storeId: string;
};

const apiCalls: ApiData[] = [
  {
    title: 'GET',
    endpoint: 'materials',
    variant: 'public',
  },
  {
    title: 'POST',
    endpoint: 'materials',
    variant: 'admin',
  },
  {
    title: 'GET',
    endpoint: 'materials/{materialId}',
    variant: 'public',
  },
  {
    title: 'PATCH',
    endpoint: 'materials/{materialId}',
    variant: 'admin',
  },
  {
    title: 'DELETE',
    endpoint: 'materials/{materialId}',
    variant: 'admin',
  },
];

export const MaterialsPage = async ({ storeId }: MaterialsPageProps) => {
  const materials = await db.material.findMany({
    where: { storeId },
    orderBy: { createdAt: 'desc' },
  });

  const formattedMaterialItems: MaterialColumn[] = materials.map((i) => ({
    id: i.id,
    value: i.value,
    createdAt: format(i.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl'>
      <div className='h-full overflow-auto px-3'>
        <section className='flex-1'>
          <MaterialsHeader materialsCount={materials.length} />
        </section>
        <section className='mt-6'>
          <MaterialsTable data={formattedMaterialItems} />
        </section>
        <section>
          <ApiList data={apiCalls} entityName='materials' />
        </section>
      </div>
    </main>
  );
};
