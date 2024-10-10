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

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl overflow-hidden'>
      <SizeForm initialData={size} />
    </main>
  );
};

export default SizeSettings;
