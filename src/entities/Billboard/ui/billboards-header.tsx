'use client';

import { Billboard, Product } from '@prisma/client';
import { useState } from 'react';

import { useModalEntityForm } from '@/shared/model';
import { EntityHeader } from '@/shared/ui';
import { ModalWrapper } from '@/shared/ui/modals';
import { BillboardForm } from './billboard-form';

type BillboardsHeaderProps = {
  billboardsCount?: number;
  products: Product[];
};

export const BillboardsHeader = ({
  billboardsCount,
  products,
}: BillboardsHeaderProps) => {
  const modalInitialData = useModalEntityForm((state) => state.initialData);
  const isModalOpen = useModalEntityForm((state) => state.isOpen);
  const onModalOpen = useModalEntityForm((state) => state.onOpen);
  const onModalClose = useModalEntityForm((state) => state.onClose);

  const [loading, setLoading] = useState(false);

  const title = modalInitialData ? 'Update a billboard' : 'Create a billboard';
  const description = modalInitialData
    ? 'Change the name of your billboard'
    : 'Enter the name of billboard';

  return (
    <>
      {isModalOpen && (
        <ModalWrapper
          onClose={onModalClose}
          isOpen={isModalOpen}
          loading={loading}>
          <BillboardForm
            initialData={modalInitialData as Billboard}
            products={products}
            title={title}
            description={description}
            setLoading={setLoading}
          />
        </ModalWrapper>
      )}
      <EntityHeader
        entityName='billboards'
        entityCount={billboardsCount}
        onCreate={() => onModalOpen()}
      />
    </>
  );
};
