'use client';

import { Category } from '@prisma/client';

import { useModalEntityForm } from '@/shared/model';
import { EntityHeader } from '@/shared/ui';
import { CategoryForm } from './categories-form';
import { ModalWrapper } from '@/shared/ui/modals';

type CategoryHeaderProps = {
  categoriesCount: number;
};

export const CategoriesHeader = ({ categoriesCount }: CategoryHeaderProps) => {
  const modalInitialData = useModalEntityForm((state) => state.initialData);
  const isModalOpen = useModalEntityForm((state) => state.isOpen);
  const onModalOpen = useModalEntityForm((state) => state.onOpen);
  const onModalClose = useModalEntityForm((state) => state.onClose);

  const title = modalInitialData ? 'Update a category' : 'Create a category';
  const description = modalInitialData
    ? 'Change the name of your category'
    : 'Enter the name of category';

  return (
    <>
      {isModalOpen && (
        <ModalWrapper onClose={onModalClose}>
          <CategoryForm
            initialData={modalInitialData as Category}
            title={title}
            description={description}
          />
        </ModalWrapper>
      )}
      <EntityHeader
        entityName='categories'
        entityCount={categoriesCount}
        onCreate={() => onModalOpen()}
      />
    </>
    // <EntityHeader entityName='categories' entityCount={categoriesCount}>
    //   <CategoryForm
    //     initialData={modalInitialData as Category}
    //     title={title}
    //     description={description}
    //   />
    // </EntityHeader>
  );
};
