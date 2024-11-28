'use client';

import { Category, Image, Material, Product, Size } from '@prisma/client';

import { useModalEntityForm } from '@/shared/model';
import { EntityHeader } from '@/shared/ui';
import { ModalWrapper } from '@/shared/ui/modals';
import { ProductForm } from './product-form';
import { useState } from 'react';

type ProductsHeaderProps = {
  productsCount?: number;
  categories: Category[];
  sizes: Size[];
  materials: Material[];
};

export const ProductsHeader = ({
  productsCount,
  categories,
  sizes,
  materials,
}: ProductsHeaderProps) => {
  const modalInitialData = useModalEntityForm((state) => state.initialData);
  const isModalOpen = useModalEntityForm((state) => state.isOpen);
  const onModalOpen = useModalEntityForm((state) => state.onOpen);
  const onModalClose = useModalEntityForm((state) => state.onClose);

  const [loading, setLoading] = useState(false);

  return (
    <>
      {isModalOpen && (
        <ModalWrapper isOpen={isModalOpen} onClose={onModalClose} loading={loading}>
          <ProductForm
            initialData={modalInitialData as Product & { images: Image[] }}
            categories={categories}
            sizes={sizes}
            materials={materials}
            setLoading={setLoading}
          />
        </ModalWrapper>
      )}
      <EntityHeader
        entityName='products'
        entityCount={productsCount}
        onCreate={() => onModalOpen()}
      />
    </>
  );
};
