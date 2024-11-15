'use client';

import { Material } from '@prisma/client';

import { useModalEntityForm } from '@/shared/model';
import { EntityHeader } from '@/shared/ui';
import { ModalWrapper } from '@/shared/ui/modals';
import { MaterialForm } from './material-form';

type MaterialsHeaderProps = {
  materialsCount: number;
};

export const MaterialsHeader = ({ materialsCount }: MaterialsHeaderProps) => {
  const modalInitialData = useModalEntityForm((state) => state.initialData);
  const isModalOpen = useModalEntityForm((state) => state.isOpen);
  const onModalOpen = useModalEntityForm((state) => state.onOpen);
  const onModalClose = useModalEntityForm((state) => state.onClose);

  const title = modalInitialData ? 'Update a material' : 'Create a material';
  const description = modalInitialData
    ? 'Change the name of material'
    : 'Enter the name of material';

  return (
    <>
      {isModalOpen && (
        <ModalWrapper isOpen={isModalOpen} onClose={onModalClose}>
          <MaterialForm
            initialData={modalInitialData as Material}
            title={title}
            description={description}
          />
        </ModalWrapper>
      )}
      <EntityHeader
        entityName='materials'
        entityCount={materialsCount}
        onCreate={onModalOpen}
      />
    </>
  );
};
