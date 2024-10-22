import { db } from '@/lib';
import { SizeForm } from '@/pages/SizesPage';

const SizeSettings = async ({
  params,
}: {
  params: { sizeId: string; storeId: string };
}) => {
  const size = await db.size.findUnique({
    where: { id: params.sizeId },
  });

  const categories = await db.category.findMany({
    where: { storeId: params.storeId },
  });

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl overflow-hidden'>
      <SizeForm initialData={size} categories={categories} />
    </main>
  );
};

export default SizeSettings;
