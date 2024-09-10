import { db } from '@/lib';
import { BillboardForm } from '@/pages/BillboardsPage';

const BillboardSettings = async ({
  params,
}: {
  params: { billboardId: string; storeId: string };
}) => {
  const billboard = await db.billboard.findUnique({
    where: { id: params.billboardId },
  });

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl overflow-hidden'>
      <BillboardForm initialData={billboard} storeId={params.storeId} />
    </main>
  );
};

export default BillboardSettings;
