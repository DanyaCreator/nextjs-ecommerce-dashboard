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

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl overflow-hidden'>
      <CategoryForm initialData={category} />
    </main>
  );
};

export default CategorySettings;
