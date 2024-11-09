'use client';

import { Plus } from 'lucide-react';
import { ReactNode, useState } from 'react';

import { useModalWrapper } from '@/shared/model';
import { dmSans } from '@/shared/assets/fonts';
import { RoundedButton } from '@/shared/ui/buttons';
import { ModalWrapper } from '@/shared/ui/modals/modal-wrapper';

type EntityHeaderProps = {
  entityName: string;
  entityCount?: number;
  children: ReactNode;
};

export const EntityHeader = ({
  entityName,
  entityCount,
  children,
}: EntityHeaderProps) => {
  const modalWrapperStore = useModalWrapper();

  const modalIsOpen = useModalWrapper((state) => state.isOpenNewCategory);
  const modalOnOpen = () => modalWrapperStore.onOpenNewCategory();

  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <header className='flex justify-between items-center pb-6 border-solid border-b border-light-gray'>
      {modalIsOpen && <ModalWrapper>{children}</ModalWrapper>}
      <div>
        <h1 className={`${dmSans.className} capitalize`}>
          {entityName}({entityCount})
        </h1>
        <span className={`${dmSans.className} text-dark-gray`}>
          Manage {entityName} for your store
        </span>
      </div>
      <RoundedButton
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        onClick={modalOnOpen}>
        <Plus className='mr-2 w-4 h-4' color={btnHovered ? '#000' : '#fff'} />
        Add new
      </RoundedButton>
    </header>
  );
};
