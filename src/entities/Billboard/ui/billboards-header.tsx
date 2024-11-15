'use client';

import { useModalEntityForm } from '@/shared/model';
import { EntityHeader } from '@/shared/ui';
import { ModalWrapper } from '@/shared/ui/modals';
import { BillboardForm } from './billboard-form';

type BillboardsHeaderProps = {
  billboardsCount?: number;
};

export const BillboardsHeader = ({
  billboardsCount,
}: BillboardsHeaderProps) => {
  const modalInitialData = useModalEntityForm((state) => state.initialData);
  const isModalOpen = useModalEntityForm((state) => state.isOpen);
  const onModalOpen = useModalEntityForm((state) => state.onOpen);
  const onModalClose = useModalEntityForm((state) => state.onClose);

  const title = modalInitialData ? 'Update a billboard' : 'Create a billboard';
  const description = modalInitialData
    ? 'Change the name of your billboard'
    : 'Enter the name of billboard';

  return (
    <>
      {isModalOpen && (
        <ModalWrapper onClose={onModalClose} isOpen={isModalOpen}>
          <BillboardForm
            initialData={null}
            products={[]}
            title={title}
            description={description}
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
