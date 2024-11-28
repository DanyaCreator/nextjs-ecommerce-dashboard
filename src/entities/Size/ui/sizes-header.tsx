'use client';

import { Category, Size } from '@prisma/client';
import { useState } from 'react';

import { useModalEntityForm } from '@/shared/model';
import { EntityHeader } from '@/shared/ui';
import { ModalWrapper } from '@/shared/ui/modals';
import { SizeForm } from './size-form';

type SizeHeaderProps = {
  sizesCount: number;
  categories: Category[];
};

export const SizesHeader = ({ sizesCount, categories }: SizeHeaderProps) => {
  const modalInitialData = useModalEntityForm((state) => state.initialData);

  const isModalOpen = useModalEntityForm((state) => state.isOpen);
  const onModalOpen = useModalEntityForm((state) => state.onOpen);
  const onModalClose = useModalEntityForm((state) => state.onClose);

  const [loading, setLoading] = useState(false);

  const title = modalInitialData ? 'Update a size' : 'Create a size';
  const description = modalInitialData ? 'Change the size' : 'Enter the size';

  return (
    <>
      {isModalOpen && (
        <ModalWrapper
          isOpen={isModalOpen}
          onClose={onModalClose}
          loading={loading}>
          <SizeForm
            initialData={modalInitialData as Size}
            categories={categories}
            title={title}
            description={description}
            setLoading={setLoading}
          />
        </ModalWrapper>
      )}
      <EntityHeader
        entityName='sizes'
        entityCount={sizesCount}
        onCreate={() => onModalOpen()}
      />
    </>
  );
};
