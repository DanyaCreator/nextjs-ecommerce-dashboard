import { format } from 'date-fns';

import { db } from '@/lib';
import { dmSans } from '@/shared/assets/fonts';
import { ApiList } from './api-list';
import { CategoriesHeader } from './categories-header';
import { CategoriesTable } from './categories-table';
import { CategoryColumn } from './columns';

type CategoriesPageProps = {
  storeId: string;
};

export const CategoriesPage = async ({ storeId }: CategoriesPageProps) => {
  const categories = await db.category.findMany({
    where: { storeId },
    include: {
      billboard: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedCategoryItems: CategoryColumn[] = categories.map((i) => ({
    id: i.id,
    name: i.name,
    billboardLabel: i.billboard.label,
    createdAt: format(i.createdAt, 'MMMM do, yyyy'),
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
          <div>
            <h1 className={`${dmSans.className}`}>API</h1>
            <span className={`${dmSans.className} text-dark-gray`}>
              API calls for stores
            </span>
          </div>
          <div className='flex flex-col'>
            <ApiList entityName='categories' entityIdName={'categoryId'} />
          </div>
        </section>
      </div>
    </main>
  );
};
