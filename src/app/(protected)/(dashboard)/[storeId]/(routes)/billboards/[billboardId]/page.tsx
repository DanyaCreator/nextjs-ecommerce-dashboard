import { db } from '@/lib';
import { BillboardForm } from '@/pages/BillboardsPage';

const BillboardSettings = async ({
  params,
}: {
  params: { billboardId: string; storeId: string };
}) => {
  const billboard = await db.billboard.findUnique({
    where: { id: params.billboardId },
    include: {
      product: true,
    },
  });

  const products = await db.product.findMany({
    where: { storeId: params.storeId },
  });

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl overflow-hidden'>
      <BillboardForm initialData={billboard} products={products} />
    </main>
  );
};

export default BillboardSettings;
