import { format } from 'date-fns';

import { db } from '@/lib';
import { ApiData, ApiList } from '@/widgets/ApiList';
import { ProductColumn, ProductsTable } from '@/features/Product';
import { ProductsHeader } from '@/entities/Product';
import { formatter } from '../lib';

type ProductsPageProps = {
  storeId: string;
};

const apiCalls: ApiData[] = [
  {
    title: 'GET',
    endpoint: 'products',
    variant: 'public',
  },
  {
    title: 'POST',
    endpoint: 'products',
    variant: 'admin',
  },
  {
    title: 'GET',
    endpoint: 'products/{productId}',
    variant: 'public',
  },
  {
    title: 'PATCH',
    endpoint: 'products/{productId}',
    variant: 'admin',
  },
  {
    title: 'DELETE',
    endpoint: 'products/{productId}',
    variant: 'admin',
  },
];

export const ProductsPage = async ({ storeId }: ProductsPageProps) => {
  const products = await db.product.findMany({
    where: { storeId },
    include: { billboard: true, category: true, size: true, material: true, images: true },
    orderBy: { createdAt: 'desc' },
  });

  const formattedProductItems: ProductColumn[] = products.map((i) => ({
    id: i.id,
    name: i.name,
    isFeatured: i.isFeatured,
    isArchived: i.isArchived,
    isPinnedOnBillboard: !!i.billboard,
    price: formatter.format(i.price.toNumber()),
    category: i.category.name,
    size: i.size.value.toString(),
    material: i.material.value,
    createdAt: format(i.createdAt, 'MMMM do, yyyy'),
    initialData: i,
  }));

  const categories = await db.category.findMany({
    where: { storeId },
  });

  const sizes = await db.size.findMany({
    where: { storeId },
  });

  const materials = await db.material.findMany({
    where: { storeId },
  });

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl overflow-hidden'>
      <div className='h-full overflow-auto px-3'>
        <section className='flex-1'>
          <ProductsHeader
            productsCount={products.length}
            categories={categories}
            materials={materials}
            sizes={sizes}
          />
        </section>
        <section className='mt-6'>
          <ProductsTable data={formattedProductItems} />
        </section>
        <section>
          <ApiList data={apiCalls} entityName='products' />
        </section>
      </div>
    </main>
  );
};
