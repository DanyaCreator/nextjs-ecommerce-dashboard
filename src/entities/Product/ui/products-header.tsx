'use client';

import { useModalEntityForm } from '@/shared/model';
import { EntityHeader } from '@/shared/ui';
import { ModalWrapper } from '@/shared/ui/modals';
import { ProductForm } from './product-form';

type ProductsHeaderProps = {
  productsCount?: number;
};

export const ProductsHeader = ({ productsCount }: ProductsHeaderProps) => {
  // const modalInitialData = useModalEntityForm((state) => state.initialData);
  const isModalOpen = useModalEntityForm((state) => state.isOpen);
  const onModalOpen = useModalEntityForm((state) => state.onOpen);
  const onModalClose = useModalEntityForm((state) => state.onClose);

  return (
    <>
      {isModalOpen && (
        <ModalWrapper isOpen={isModalOpen} onClose={onModalClose}>
          <ProductForm
            initialData={null}
            categories={[]}
            sizes={[]}
            materials={[]}
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
