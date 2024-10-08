import { db } from '@/lib';
import { CategoryForm } from '@/pages/CategoriesPage';

const CategorySettings = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await db.category.findUnique({
    where: { id: params.categoryId },
  });

  const billboards = await db.billboard.findMany({
    where: { storeId: params.storeId },
  });

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl overflow-hidden'>
      <CategoryForm initialData={category} billboards={billboards} />
    </main>
  );
};

export default CategorySettings;
