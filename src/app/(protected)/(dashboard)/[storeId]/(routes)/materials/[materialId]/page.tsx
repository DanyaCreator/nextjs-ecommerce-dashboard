import { db } from '@/lib';
import { MaterialForm } from '@/pages/MaterialsPage';

const SizeSettings = async ({
  params,
}: {
  params: { materialId: string; storeId: string };
}) => {
  const material = await db.material.findUnique({
    where: { id: params.materialId },
  });

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl overflow-hidden'>
      <MaterialForm initialData={material} />
    </main>
  );
};

export default SizeSettings;
