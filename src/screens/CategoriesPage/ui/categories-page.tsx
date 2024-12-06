import { format } from 'date-fns';

import { db } from '@/lib';
import { ApiData, ApiList } from '@/widgets/ApiList';
import { CategoriesTable, CategoryColumn } from '@/features/Category';
import { CategoriesHeader } from '@/entities/Category';

type CategoriesPageProps = {
  storeId: string;
};

const apiCalls: ApiData[] = [
  {
    title: 'GET',
    endpoint: 'categories',
    variant: 'public',
  },
  {
    title: 'POST',
    endpoint: 'categories',
    variant: 'admin',
  },
  {
    title: 'GET',
    endpoint: 'categories/{categoryId}',
    variant: 'public',
  },
  {
    title: 'PATCH',
    endpoint: 'categories/{categoryId}',
    variant: 'admin',
  },
  {
    title: 'DELETE',
    endpoint: 'categories/{categoryId}',
    variant: 'admin',
  },
];

export const CategoriesPage = async ({ storeId }: CategoriesPageProps) => {
  const categories = await db.category.findMany({
    where: { storeId },
    orderBy: { createdAt: 'desc' },
  });

  const formattedCategoryItems: CategoryColumn[] = categories.map((i) => ({
    id: i.id,
    name: i.name,
    createdAt: format(i.createdAt, 'MMMM do, yyyy'),
    initialData: i,
  }));

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl'>
      <div className='h-full overflow-auto px-3'>
        <section className='flex-1'>
          <CategoriesHeader categoriesCount={categories.length} />
        </section>
        <section className='mt-6'>
          <CategoriesTable data={formattedCategoryItems} />
        </section>
        <section>
          <ApiList data={apiCalls} entityName='categories' />
        </section>
      </div>
    </main>
  );
};
