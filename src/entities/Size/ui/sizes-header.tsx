'use client';

import { Size } from '@prisma/client';

import { useModalEntityForm } from '@/shared/model';
import { EntityHeader } from '@/shared/ui';
import { ModalWrapper } from '@/shared/ui/modals';
import { SizeForm } from './size-form';

type SizeHeaderProps = {
  sizesCount: number;
};

export const SizesHeader = ({ sizesCount }: SizeHeaderProps) => {
  const modalInitialData = useModalEntityForm((state) => state.initialData);
  const isModalOpen = useModalEntityForm((state) => state.isOpen);
  const onModalOpen = useModalEntityForm((state) => state.onOpen);
  const onModalClose = useModalEntityForm((state) => state.onClose);

  const title = modalInitialData ? 'Update a size' : 'Create a size';
  const description = modalInitialData ? 'Change the size' : 'Enter the size';

  return (
    <>
      {isModalOpen && (
        <ModalWrapper isOpen={isModalOpen} onClose={onModalClose}>
          <SizeForm
            initialData={modalInitialData as Size}
            categories={[]}
            title={title}
            description={description}
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
