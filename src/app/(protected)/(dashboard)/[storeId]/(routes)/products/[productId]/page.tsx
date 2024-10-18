import { db } from '@/lib';
import { ProductForm } from '@/pages/ProductsPage';

const ProductSettings = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await db.product.findUnique({
    where: { id: params.productId },
    include: {
      images: true,
      size: true,
      category: true,
      billboard: true,
      material: true,
    },
  });

  const categories = await db.category.findMany({
    where: { storeId: params.storeId },
  });

  const sizes = await db.size.findMany({
    where: { storeId: params.storeId },
  });

  const materials = await db.material.findMany({
    where: { storeId: params.storeId },
  });

  const billboards = await db.billboard.findMany({
    where: { storeId: params.storeId },
  });

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl overflow-hidden'>
      <ProductForm
        initialData={product}
        categories={categories}
        sizes={sizes}
        materials={materials}
        billboards={billboards}
      />
    </main>
  );
};

export default ProductSettings;
